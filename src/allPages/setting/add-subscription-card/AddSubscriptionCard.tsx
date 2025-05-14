"use client";
import FormInput from "@/components/formComponents/FormInput";
import FormMultiselect from "@/components/formComponents/FormMultiselect";
import FormSelect from "@/components/formComponents/FormSelect";
import { getRequest, postRequest, putRequest } from "@/lib/services/request";
import { Form, message } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AddSubscriptionCardProps {
  onClose: () => void;
  open: boolean;
}

const benifitsOptions = [
  { label: 'All', value: 'all' },
  { label: 'Gym Workout', value: 'gym_workout' },
  { label: 'Group Clases', value: 'group_clases' },
  { label: 'Zumba', value: 'zumba' },
]

const AddSubscriptionCard: React.FC<AddSubscriptionCardProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  useEffect(() => {
    if(params.subscriptionId === 'add') return;
 
    const fetchSubscriptionById = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/memberships/${params.subscriptionId}?gymBranchId=${currentGymBranchId}`);
        console.log(data, "gymSubscriptiondata");
        setSubscriptionData(data);
      } catch (error) {
        // Optionally handle error
        setSubscriptionData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionById();
  }, [])

  const handleFinish = async (values: any) => {
    if (params.subscriptionId != 'add') {
      const payload = {
        name: values.name || subscriptionData?.name,
        actualPrice: values.actualPrice || subscriptionData.actualPrice,
        membershipDiscountedPrice: Number(values.membershipDiscountedPrice) || Number(subscriptionData.membershipDiscountedPrice),
        baseDuration: Number(values.baseDuration) || Number(subscriptionData.baseDuration),
        benefits: values.benefits || subscriptionData?.benefits,
      }
      try {
        const response = await putRequest(`/api/memberships/${params.subscriptionId}?gymBranchId=${currentGymBranchId}`, payload);
        toast.success("Subscription Plan updated successfully")
        router.push("/management/settings/account-details/branch")
        console.log(response, "branch updated");
      } catch (error) {
        toast.error("Subscription Plan updation failed")
        console.error("Branch creation failed:", error);
      }
    } else {
      console.log('post request');
      
      const payload = {
        name: values.name,
        actualPrice: values.actualPrice,
        baseDuration: Number(values.baseDuration),
        membershipDiscountedPrice: Number(values.membershipDiscountedPrice) ,
        benefits: values.benefits,
        gymBranchId: 'aa2ec403-de84-43eb-913a-9c63455f26ca'
      }
      try {
        const response = await postRequest(`/api/memberships`, payload);
        toast.success("New Subscription Plan created successfully")
        router.push("/management/settings/account-details/branch")
        console.log(response, "branch created");
      } catch (error) {
        toast.error("Subscription Plan creation failed")
        console.error("Branch creation failed:", error);
      }
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return loading ? (
    <div>
      Loading...
    </div>
  ) : (
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
                <FormInput
                  label="Subcription Title"
                  name="name"
                  initialValue={subscriptionData?.name}
                />
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <FormMultiselect
              label="Benefits "
              name="benefits"
              options={benifitsOptions}
              initialValue={subscriptionData?.benefits?.length > 0 && subscriptionData?.benefits[0]}
            />
          </div>

          <FormInput
            label="Actual Price"
            name="actualPrice"
            initialValue={subscriptionData.actualPrice}
          />
          <FormInput
            label="Membership Price"
            name="membershipDiscountedPrice"
            initialValue={subscriptionData.membershipDiscountedPrice}
          />

          {/* <FormInput label="Discounted Price" name="discountedPrice" /> */}

          <FormInput
            label="Duration (Month)"
            name="baseDuration"
            initialValue={subscriptionData.baseDuration}
          />
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-4">
          {/* <Link href={`/management/settings/subscription-details`}> */}
          <button
            type="button"
            onClick={() => handleCancel()}
            className=" w-[147px] h-8 !bg-blue-light !text-black-primary rounded-lg px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          {/* </Link> */}
          <button
            type="submit"
            className="min-w-[147px] h-8 !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer"
          >
            Add Subcription Plan
          </button>
        </div>
      </Form>
    </main>
  );
};

export default AddSubscriptionCard;
