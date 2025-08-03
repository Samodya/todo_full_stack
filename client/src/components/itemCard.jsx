export const ItemsCard = ({ title, seconditem, content,content2}) => {
  return (
    <div className="p-2 mb-2 w-full bg-gray-100 rounded">
      <div className="p-1 flex justify-between">
        <div className="font-bold text-md">{title}</div>
        <div>{seconditem}</div>
      </div>
      <div className="p-1 flex justify-between items-center">
      <div>{content}</div>
        <div>{content2}</div>
      </div>
    </div>
  );
};
