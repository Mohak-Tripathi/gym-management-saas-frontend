"use client";
import FormInput from "@/components/formComponents/FormInput";
import FormSelect from "@/components/formComponents/FormSelect";
import { Form } from "antd";
import Image from "next/image";
import { useEffect } from "react";

interface AddSubscriptionCardProps {
  onClose: () => void;
  open: boolean;
}

const AddSubscriptionCard: React.FC<AddSubscriptionCardProps> = ({
  onClose,
  open,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);

  return (
    <main className="w-full h-full">
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="h-full flex flex-col justify-between gap-4"
      >
        {/* user data */}
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={`/images/Dumbell.svg`}
              width={0}
              height={0}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <FormInput label="Subcription Title" name="subscriptionTitle" />
          </div>

          <FormInput label="Description " name="description" />

          <div className="w-full grid grid-cols-2 gap-4">
            <FormInput label="Actual Price" name="actualPrice" />

            <FormInput label="Discounted Price" name="discountedPrice" />

            <FormInput label="Classes allowed" name="classesAllowed" />
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleCancel()}
            className=" w-[147px] h-10 !bg-[#F5FAFB] !text-[#071726] rounded-lg px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-w-[147px] h-10 !bg-[#071726] !text-white rounded-lg px-4 py-2 cursor-pointer"
          >
            Add Subcription Plan
          </button>
        </div>
      </Form>
    </main>
  );
};

export default AddSubscriptionCard;
