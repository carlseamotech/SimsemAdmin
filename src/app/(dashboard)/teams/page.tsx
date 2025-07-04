"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/header";
import TeamTable from "./components/team-table";
import InviteDialog from "./components/invite-dialog";

const TeamsPage = () => {
  const [isInviteDialogOpen, setInviteDialogOpen] = useState(false);

  return (
    <>
      <Header title="Team" />
      <div className="flex-1 py-6 px-8">
        <div className="flex justify-end">
          <Button onClick={() => setInviteDialogOpen(true)}>
            Invite Member
          </Button>
        </div>
        <TeamTable />
        <InviteDialog
          isOpen={isInviteDialogOpen}
          onClose={() => setInviteDialogOpen(false)}
        />
      </div>
    </>
  );
};

export default TeamsPage;
