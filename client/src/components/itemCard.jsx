export const ItemsCard = ({ title, seconditem, content }) => {
  return (
    <div className="p-2 mb-2 w-full bg-gray-100 rounded">
      <div className="p-1 flex justify-between">
        <div className="font-bold text-md">{title}</div>
        <div>{seconditem}</div>
      </div>
      <div>{content}</div>
    </div>
  );
};
