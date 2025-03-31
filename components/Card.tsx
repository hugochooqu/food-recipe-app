import React from "react";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import CurrencyConverter from "./currencyConverter";

interface CardProps {
  id: string | number;
  title: string;
  image?: string;
  subtitle?: string;
  details?: {
    label: string;
    value: string | number;
  }[];
  popoverContent?: React.ReactNode;
  onClick?: () => void;
  actionText?: string;
  showAction?: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  image,
  subtitle,
  details,
  popoverContent,
  onClick,
  actionText = "View details",
  showAction = true,
}) => {
  return (
    <div
      key={id}
      className="bg-white p-4 rounded-lg shadow-md w-[400px] text-black transition-transform transform hover:scale-105"
    >
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <h2 className="text-lg font-semibold mt-2">{title}</h2>

      {subtitle && <p className="text-gray-500">{subtitle}</p>}

      {details &&
  details.map((detail, index) => 
    detail.label === "Cost" ? (
      <div key={index} className="flex items-center justify-left gap-5 w-full">
        <p className="text-gray-800">{detail.label}: {`₦${detail.value}`}</p>
        
        {popoverContent && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-purple-700 text-white">
                Click to see USD
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-35 h-20">
              <CurrencyConverter costInNaira={Number(detail.value)} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    ) : (
      <p key={index} className="text-gray-800">
        {detail.label}: {detail.value}
      </p>
    )
  )
}

      {showAction && onClick && (
        <p
          onClick={onClick}
          className="text-purple-700 cursor-pointer mt-2 hover:underline"
        >
          {actionText}
        </p>
      )}
    </div>
  );
};

export default Card;
