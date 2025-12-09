'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateOrderStatus } from '@/lib/hooks/use-orders';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw } from 'lucide-react';
import type { OrderStatus } from '@/types/api';

interface UpdateStatusDialogProps {
  orderId: string;
  currentStatus: OrderStatus;
  onSuccess?: () => void;
}

// Validar transiciones permitidas para drivers
const getValidTransitions = (currentStatus: OrderStatus): OrderStatus[] => {
  switch (currentStatus) {
    case 'ASSIGNED':
      return ['IN_TRANSIT'];
    case 'IN_TRANSIT':
      return ['DELIVERED', 'FAILED', 'CANCELLED'];
    default:
      return [];
  }
};

const updateStatusSchema = z.object({
  to_status: z.enum(['IN_TRANSIT', 'DELIVERED', 'FAILED', 'CANCELLED']),
  notes: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

type UpdateStatusFormValues = z.infer<typeof updateStatusSchema>;

export function UpdateStatusDialog({
  orderId,
  currentStatus,
  onSuccess,
}: UpdateStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const updateStatus = useUpdateOrderStatus();

  const validTransitions = getValidTransitions(currentStatus);

  const form = useForm<UpdateStatusFormValues>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      to_status: (validTransitions[0] as 'IN_TRANSIT' | 'DELIVERED' | 'FAILED' | 'CANCELLED') || 'IN_TRANSIT',
      notes: '',
      cancellation_reason: '',
    },
  });

  const selectedStatus = form.watch('to_status');

  const onSubmit = async (data: UpdateStatusFormValues) => {
    try {
      await updateStatus.mutateAsync({
        id: orderId,
        to_status: data.to_status,
        notes: data.notes,
        cancellation_reason: data.cancellation_reason,
      });
      setOpen(false);
      form.reset();
      onSuccess?.();
    } catch {
      // Error handling is done by the mutation
    }
  };

  if (validTransitions.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="Actualizar estado de la orden">
          <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
          Actualizar Estado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar Estado de la Orden</DialogTitle>
          <DialogDescription>
            Cambia el estado de la orden. Solo se permiten transiciones válidas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="to_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nuevo Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger aria-label="Seleccionar nuevo estado">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {validTransitions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === 'IN_TRANSIT' && 'En Tránsito'}
                          {status === 'DELIVERED' && 'Entregada'}
                          {status === 'FAILED' && 'Fallida'}
                          {status === 'CANCELLED' && 'Cancelada'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedStatus === 'CANCELLED' && (
              <FormField
                control={form.control}
                name="cancellation_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón de Cancelación</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explica por qué se cancela la orden..."
                        {...field}
                        aria-label="Razón de cancelación"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Agrega notas adicionales..."
                      {...field}
                      aria-label="Notas adicionales"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                aria-label="Cancelar"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={updateStatus.isPending}
                aria-label="Confirmar actualización"
              >
                {updateStatus.isPending ? 'Actualizando...' : 'Actualizar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

