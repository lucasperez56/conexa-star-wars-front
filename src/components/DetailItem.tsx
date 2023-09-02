const DetailItem: React.FC<{ label: string, value: string }> = ({ label, value }) => {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h3 className="text-xl font-semibold mb-2">{label}</h3>
        <p className="text-gray-400">{value}</p>
      </div>
    );
  };

export default DetailItem;