"use client";
import FormInput from "@/components/formComponents/FormInput";
import { Form } from "antd";
import Image from "next/image";

interface AddSubscriptionCardProps {
  onClose: () => void;
  open: boolean;
}

const AddSubscriptionCard: React.FC<AddSubscriptionCardProps> = ({ onClose, open }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <main className="w-full h-full">
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="h-full flex flex-col justify-between gap-4"
      >
        {/* user data */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="w-full flex gap-2">
              <Image
                src={`/images/Dumbell.svg`}
                width={0}
                height={0}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-full">
                <FormInput label="Subcription Title" name="subscriptionTitle" />
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <FormInput label="Description " name="description" />
          </div>

          <FormInput label="Actual Price" name="actualPrice" />

          <FormInput label="Discounted Price" name="discountedPrice" />

          <FormInput label="Classes allowed" name="classesAllowed" />
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-4">
          {/* <Link href={`/management/settings/subscription-details`}> */}
            <button
              type="button"
              onClick={() => handleCancel()}
              className=" w-[147px] h-10 !bg-[#F5FAFB] !text-black-primary rounded-lg px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
          {/* </Link> */}
          <button
            type="submit"
            className="min-w-[147px] h-10 !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer"
          >
            Add Subcription Plan
          </button>
        </div>
      </Form>
    </main>
  );
};

export default AddSubscriptionCard;
