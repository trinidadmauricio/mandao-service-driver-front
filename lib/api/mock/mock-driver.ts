/**
 * Mock data para driver/profile
 */

export interface MockDriver {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  identity_document: string;
  driving_license: string;
  date_of_birth: string;
  availability_status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'SUSPENDED';
  rating_avg?: number;
  total_deliveries: number;
  vehicle?: {
    id: string;
    vehicle_type: string;
    license_plate: string;
    brand: string;
    model: string;
    year: number;
  };
}

export const mockGetDriver = async (driverId: string): Promise<MockDriver> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    id: driverId,
    user_id: 'user-123',
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'driver@example.com',
    phone: '+1234567890',
    identity_document: '12345678',
    driving_license: 'LIC-123456',
    date_of_birth: '1990-01-15',
    availability_status: 'AVAILABLE',
    rating_avg: 4.5,
    total_deliveries: 150,
    vehicle: {
      id: 'vehicle-1',
      vehicle_type: 'MOTORCYCLE',
      license_plate: 'ABC-123',
      brand: 'Honda',
      model: 'CBR 150',
      year: 2020,
    },
  };
};

export const mockUpdateDriver = async (
  driverId: string,
  data: Partial<MockDriver>
): Promise<MockDriver> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const driver = await mockGetDriver(driverId);
  return { ...driver, ...data };
};

