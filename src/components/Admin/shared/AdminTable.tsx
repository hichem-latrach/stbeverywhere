import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus } from 'lucide-react';

interface AdminTableProps {
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
  showStatusFilter?: boolean;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  statusOptions?: { value: string; label: string }[];
  columns: { key: string; label: string; align?: 'left' | 'center' | 'right' }[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
  emptyMessage?: string;
  emptyDescription?: string;
}

const AdminTable: React.FC<AdminTableProps> = ({
  title,
  searchTerm,
  onSearchChange,
  showAddButton = false,
  onAddClick,
  addButtonText = "Add New",
  showStatusFilter = false,
  statusFilter = "all",
  onStatusFilterChange,
  statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" }
  ],
  columns,
  data,
  renderRow,
  emptyMessage = "No records found",
  emptyDescription = "Try adjusting your search or filter criteria"
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
              <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
              
              {showAddButton && (
                <Button 
                  onClick={onAddClick} 
                  className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{addButtonText}</span>
                </Button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                />
              </div>
              
              {showStatusFilter && (
                <select
                  value={statusFilter}
                  onChange={(e) => onStatusFilterChange?.(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-gray-50">
                  {columns.map((column) => (
                    <TableHead 
                      key={column.key} 
                      className={`text-gray-700 font-semibold ${
                        column.align === 'right' ? 'text-right' : 
                        column.align === 'center' ? 'text-center' : ''
                      }`}
                    >
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => renderRow(item, index))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden p-4 space-y-4">
            {data.map((item, index) => (
              <Card key={item.id || index} className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  {renderRow(item, index)}
                </CardContent>
              </Card>
            ))}
          </div>

          {data.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">{emptyMessage}</div>
              <div className="text-gray-500">{emptyDescription}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTable;
