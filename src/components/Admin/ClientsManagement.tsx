import React, { useState } from "react";
import AdminTable from "./shared/AdminTable";
import AddClientDialog from "./shared/AddClientDialog";
import EditClientDialog from "./shared/EditClientDialog";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  hasKycChange: boolean;
  kycDetails?: {
    fieldChanged: string;
    oldValue: string;
    newValue: string;
    reason: string;
  };
}

const ClientsManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([
    {
      id: "C-001",
      firstName: "Ahmed",
      lastName: "Ben Ali",
      address: "123 Main St, Tunis",
      phone: "+216 98 123 456",
      email: "ahmed.benali@email.com",
      hasKycChange: true,
      kycDetails: {
        fieldChanged: "Nationality",
        oldValue: "Tunisian",
        newValue: "French",
        reason: "Marriage relocation",
      },
    },
    {
      id: "C-002",
      firstName: "Fatma",
      lastName: "Khelifi",
      address: "456 Elm St, Sousse",
      phone: "+216 97 234 567",
      email: "fatma.khelifi@email.com",
      hasKycChange: false,
    },
    {
      id: "C-003",
      firstName: "Mohamed",
      lastName: "Trabelsi",
      address: "789 Maple St, Sfax",
      phone: "+216 99 345 678",
      email: "mohamed.trabelsi@email.com",
      hasKycChange: false,
    },
  ]);


  const filteredClients = clients.filter((client) =>
    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (clientData: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
  }) => {
    const newClient: Client = {
      id: `C-${String(clients.length + 1).padStart(3, '0')}`,
      ...clientData,
      hasKycChange: false,
    };
    
    setClients([...clients, newClient]);
    toast({
      title: "Client Added",
      description: `Client ${newClient.id} has been added successfully.`,
    });
  };

  const handleShowAddDialog = () => {
    setShowAddDialog(true);
  };

  const handleEditClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setEditingClient(client);
      setShowEditDialog(true);
    }
  };

  const handleSaveEditClient = (clientId: string, updatedData: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
  }) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, ...updatedData }
        : client
    ));
    toast({
      title: "Client Updated",
      description: `Client ${clientId} has been updated successfully.`,
    });
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
    toast({
      title: "Client Deleted",
      description: `Client ${clientId} has been deleted successfully.`,
    });
  };

  return (
    <>
      <AdminTable
        title="STB Clients Management"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showAddButton
        onAddClick={handleShowAddDialog}
        addButtonText="Add Client"
      columns={[
        { key: "id", label: "ID" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "address", label: "Address" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "actions", label: "Actions", align: "right" },
      ]}
      data={filteredClients}
        renderRow={(client) => (
          <TableRow key={client.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
            <TableCell className="font-medium text-blue-600">{client.id}</TableCell>
            <TableCell className="text-gray-900">{client.firstName}</TableCell>
            <TableCell className="text-gray-900">{client.lastName}</TableCell>
            <TableCell className="text-gray-900">{client.address}</TableCell>
            <TableCell className="text-gray-900">{client.phone}</TableCell>
            <TableCell className="text-gray-900">{client.email}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEditClient(client.id)} className="text-gray-600 hover:text-blue-600 border-gray-200">
                  <Edit className="w-4 h-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-gray-600 hover:text-green-600 border-gray-200">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">Client Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-gray-900">
                        <div>
                          <p className="text-sm font-medium">First Name: {client.firstName}</p>
                          <p className="text-sm font-medium">Last Name: {client.lastName}</p>
                          <p className="text-sm font-medium">Address: {client.address}</p>
                          <p className="text-sm font-medium">Phone: {client.phone}</p>
                          <p className="text-sm font-medium">Email: {client.email}</p>
                        </div>
                        {client.hasKycChange && client.kycDetails && (
                          <div className="border-l border-gray-300 pl-4">
                            <p className="text-sm font-bold mb-2 text-gray-900">Pending KYC Changes:</p>
                            <p className="text-sm">Field Changed: {client.kycDetails.fieldChanged}</p>
                            <p className="text-sm">Old Value: {client.kycDetails.oldValue}</p>
                            <p className="text-sm">New Value: {client.kycDetails.newValue}</p>
                            <p className="text-sm">Reason: {client.kycDetails.reason}</p>
                            <div className="flex space-x-2 mt-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                Approve
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline" onClick={() => handleDeleteClient(client.id)} className="text-gray-600 hover:text-red-600 border-gray-200">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
        emptyMessage="No clients found"
        emptyDescription="Try adjusting your search terms."
      />
      
      <AddClientDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddClient={handleAddClient}
      />
      
      <EditClientDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        client={editingClient}
        onEditClient={handleSaveEditClient}
      />
    </>
  );
};

export default ClientsManagement;
