import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";

interface Item {
  _id: string;
  name: string;
  quantity: number;
  isChecked: boolean;
}

export default function ListItem({
  item,
  onToggle,
  onDelete,
  onEdit,
}: {
  item: Item;
  onToggle: (id: string, checked: boolean) => void;
  onDelete: (name: string, id: string) => void;
  onEdit: (id: string, newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);

  return (
    <div
      className={`flex w-full flex-row items-center justify-between rounded-4xl px-4 py-2 ${
        item.isChecked ? "bg-[#E3F8F0]" : "bg-[#F7F7F7]"
      }`}
    >
      {/* Left side (checkbox + name) */}
      <div className="flex items-center gap-3">
        {/* CHECKBOX */}
        <label className="flex cursor-pointer items-center gap-3 select-none">
          <input
            type="checkbox"
            checked={item.isChecked}
            onChange={(e) => onToggle(item._id, e.target.checked)}
            className="peer sr-only"
          />

          {/* custom box */}
          <span className="border-secondary peer-checked:bg-primary peer-checked:border-primary h-5 w-5 rounded border-2 transition-all"></span>

          {/* DISPLAY or EDIT MODE */}
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-max px-2"
            />
          ) : (
            <p
              className={`${
                item.isChecked ? "line-through text-gray-400" : ""
              }`}
            >
              {item.name}
            </p>
          )}
        </label>
      </div>

      {/* Right side (actions) */}
      <div className="flex flex-row gap-2">
        {isEditing ? (
          <>
            <Button
              variant="primary"
              onClick={() => {
                onEdit(item._id, editedName);
                setIsEditing(false);
              }}
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              icon={Edit}
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              className="bg-red-500"
              variant="primary"
              icon={Delete}
              iconPosition="left"
              onClick={() => onDelete(item.name, item._id)}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
