// @ts-nocheck
'use server';

import { z } from 'zod';
import db from './db';
import { revalidatePath } from 'next/cache';

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

    try {
        await db.query(
            'INSERT INTO parameters (key, value, description) VALUES ($1, $2, $3)',
            [validatedFields.data.key, validatedFields.data.value, validatedFields.data.description]
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
    
    // For now, we'll use a placeholder avatar and active status
    const avatar = `https://i.pravatar.cc/150?u=${validatedFields.data.email}`;
    const status = 'Active';

    try {
        await db.query(
            'INSERT INTO users (name, email, role, avatar, status) VALUES ($1, $2, $3, $4, $5)',
            [validatedFields.data.name, validatedFields.data.email, validatedFields.data.role, avatar, status]
        );
        revalidatePath('/settings');
        return { message: 'User created successfully.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Create User.' };
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
