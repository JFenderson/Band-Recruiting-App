// components/OffersTable.tsx
import React from "react";

interface Offer {
  offerId: string;
  studentName: string;
  offerAmount: number;
  status: string;
  lastUpdated: string;
}

interface OffersTableProps {
  offers: Offer[];
  onEdit: (offerId: string) => void;
  onDelete: (offerId: string) => void;
}

const OffersTable: React.FC<OffersTableProps> = ({ offers, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Student</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer.offerId}>
            <td>{offer.studentName}</td>
            <td>{offer.offerAmount}</td>
            <td>{offer.status}</td>
            <td>{new Date(offer.lastUpdated).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(offer.offerId)} className="text-blue-500 hover:underline">
                Edit
              </button>
              <button onClick={() => onDelete(offer.offerId)} className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OffersTable;
