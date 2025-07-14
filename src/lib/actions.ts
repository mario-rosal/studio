// @ts-nocheck
'use server';

import { z } from 'zod';
import db from './db';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- Authentication Actions ---

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export async function signup(formData: FormData) {
    const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return { success: false, error: 'An account with this email already exists.' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = randomUUID();
        const avatar = `https://i.pravatar.cc/150?u=${email}`;
        
        await db.query(
            'INSERT INTO users (id, name, email, password, role, status, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id, name, email, hashedPassword, 'Technician', 'Active', avatar]
        );
        
        revalidatePath('/settings');
        return { success: true };

    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, error: 'Database Error: Failed to create user.' };
    }
}


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required.'),
});

export async function login(formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: 'Invalid fields provided.' };
    }
    
    const { email, password } = validatedFields.data;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return { error: 'Invalid email or password.' };
        }

        const user = result.rows[0];
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return { error: 'Invalid email or password.' };
        }
        
        const sessionData = { id: user.id, name: user.name, email: user.email, role: user.role };
        cookies().set('auth_session', JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });

    } catch (error) {
        console.error('Login Error:', error);
        return { error: 'Database Error: Failed to log in.' };
    }

    redirect('/dashboard');
}


// --- Parameter Actions ---
const parameterSchema = z.object({
    key: z.string().min(1, 'Key is required.'),
    value: z.string().min(1, 'Value is required.'),
    description: z.string().min(1, 'Description is required.'),
});

export async function createParameter(formData: FormData) {
    const validatedFields = parameterSchema.safeParse({
        key: formData.get('key'),
        value: formData.get('value'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const id = randomUUID();

    try {
        await db.query(
            'INSERT INTO parameters (id, key, value, description) VALUES ($1, $2, $3, $4)',
            [id, validatedFields.data.key, validatedFields.data.value, validatedFields.data.description]
        );
        revalidatePath('/settings');
        return { message: 'Parameter created successfully.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Create Parameter.' };
    }
}

export async function updateParameter(id: string, formData: FormData) {
    const validatedFields = parameterSchema.safeParse({
        key: formData.get('key'),
        value: formData.get('value'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await db.query(
            'UPDATE parameters SET key = $1, value = $2, description = $3 WHERE id = $4',
            [validatedFields.data.key, validatedFields.data.value, validatedFields.data.description, id]
        );
        revalidatePath('/settings');
        return { message: 'Parameter updated successfully.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Update Parameter.' };
    }
}

export async function deleteParameter(id: string) {
    try {
        await db.query('DELETE FROM parameters WHERE id = $1', [id]);
        revalidatePath('/settings');
        return { message: 'Parameter deleted successfully.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Parameter.' };
    }
}


// --- User Actions ---
const userSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email address.'),
    role: z.enum(['Administrator', 'Technician', 'Viewer']),
});

export async function createUser(formData: FormData) {
    const validatedFields = userSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const id = randomUUID();
    const avatar = `https://i.pravatar.cc/150?u=${validatedFields.data.email}`;
    const status = 'Active';
    const tempPassword = randomUUID(); // Not used for login, just to satisfy NOT NULL if needed.
    const hashedPassword = await bcrypt.hash(tempPassword, 10);


    try {
        await db.query(
            'INSERT INTO users (id, name, email, role, avatar, status, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id, validatedFields.data.name, validatedFields.data.email, validatedFields.data.role, avatar, status, hashedPassword]
        );
        revalidatePath('/settings');
        return { success: true, message: 'User created successfully.' };
    } catch (error) {
        console.error('Database Error:', error);
        return { success: false, message: 'Database Error: Failed to Create User.' };
    }
}


const userRoleSchema = z.object({
    role: z.enum(['Administrator', 'Technician', 'Viewer']),
});

export async function updateUserRole(id: string, formData: FormData) {
    const validatedFields = userRoleSchema.safeParse({
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await db.query(
            'UPDATE users SET role = $1 WHERE id = $2',
            [validatedFields.data.role, id]
        );
        revalidatePath('/settings');
        return { message: 'User role updated successfully.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Update User Role.' };
    }
}

export async function deleteUser(id: string) {
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        revalidatePath('/settings');
        return { message: 'User deleted successfully.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete User.' };
    }
}
