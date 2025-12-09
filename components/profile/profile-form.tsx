'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDriver, useUpdateDriver } from '@/lib/hooks/use-driver';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Save } from 'lucide-react';

const profileSchema = z.object({
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres').optional(),
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { data: driver, isLoading } = useDriver();
  const updateDriver = useUpdateDriver();
  const initializedDriverId = useRef<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
    },
  });

  // Actualizar valores cuando se carga el driver (solo una vez por driver)
  useEffect(() => {
    if (driver && driver.id !== initializedDriverId.current && !form.formState.isDirty) {
      form.reset({
        first_name: driver.first_name,
        last_name: driver.last_name,
        phone: driver.phone || '',
      });
      initializedDriverId.current = driver.id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver?.id]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateDriver.mutateAsync(data);
    } catch {
      // Error handling is done by the mutation
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!driver) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} aria-label="Nombre" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} aria-label="Apellido" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" aria-label="Teléfono" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Email: {driver.email}</p>
              <p>Documento: {driver.identity_document}</p>
              <p>Licencia: {driver.driving_license}</p>
            </div>

            <Button type="submit" disabled={updateDriver.isPending} aria-label="Guardar cambios">
              <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              {updateDriver.isPending ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

