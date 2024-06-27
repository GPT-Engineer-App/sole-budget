import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Income", brand: "Nike" },
    { id: 2, date: "2023-10-02", amount: 150, type: "Expense", brand: "Adidas" },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "Income",
    brand: "Nike",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = () => {
    if (editTransactionId !== null) {
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === editTransactionId ? { ...newTransaction, id: editTransactionId } : transaction
        )
      );
      toast("Transaction updated successfully.");
    } else {
      setTransactions((prev) => [
        ...prev,
        { ...newTransaction, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
      toast("Transaction added successfully.");
    }
    setNewTransaction({ date: "", amount: "", type: "Income", brand: "Nike" });
    setEditTransactionId(null);
    setIsDialogOpen(false);
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setNewTransaction(transaction);
    setEditTransactionId(id);
    setIsDialogOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    toast("Transaction deleted successfully.");
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.brand}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEditTransaction(transaction.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteTransaction(transaction.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTransactionId !== null ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="date"
              type="date"
              placeholder="Date"
              value={newTransaction.date}
              onChange={handleInputChange}
            />
            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
            <Select
              value={newTransaction.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newTransaction.brand}
              onValueChange={(value) => handleSelectChange("brand", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddTransaction}>
              {editTransactionId !== null ? "Update Transaction" : "Add Transaction"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;