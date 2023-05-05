import { IconType } from "react-icons/lib";

export const SimpleButton = ({
  onClick,
  title,
  Icon,
}: {
  onClick: () => void;
  title: string;
  Icon: IconType;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center w-56 p-3 font-medium transition-all border-2 border-gray-400 rounded-md bg-slate-50 drop-shadow-md hover:bg-slate-100"
    >
      <Icon className="mr-3 text-2xl" />
      {title}
    </button>
  );
};
