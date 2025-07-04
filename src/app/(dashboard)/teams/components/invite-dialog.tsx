"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { inviteTeamMember } from "@/services/teams";
import { useSWRConfig } from "swr";
import { Role } from "@/models/role";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(Role),
});

const InviteDialog: React.FC<InviteDialogProps> = ({ isOpen, onClose }) => {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(inviteSchema),
  });

  const onSubmit = async (data: { email: string; role: Role }) => {
    await inviteTeamMember(data.email, data.role);
    mutate("/classes/Team");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} placeholder="Email" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Role).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-red-500">{errors.role.message}</p>
          )}
          <Button type="submit" className="mt-4">
            Invite
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
