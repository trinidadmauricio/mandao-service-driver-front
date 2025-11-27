import { ProfileForm } from '@/components/profile/profile-form';
import { VehicleInfo } from '@/components/profile/vehicle-info';
import { ProfileStats } from '@/components/profile/profile-stats';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tu información personal y vehículo
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileForm />
        <div className="space-y-6">
          <VehicleInfo />
          <ProfileStats />
        </div>
      </div>
    </div>
  );
}

