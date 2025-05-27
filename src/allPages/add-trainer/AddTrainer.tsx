'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormMultiselect from '@/components/formComponents/FormMultiselect';
import FormSelect from '@/components/formComponents/FormSelect';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, message, Skeleton } from 'antd'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { toast } from "sonner";
import { workTypeOption } from '@/constant/filterData';
import { expertiseOptions, genderOption } from '@/constant/dropdownData';
import WebcamCapture from '@/components/WebcamCapture';

interface AddTrainerProps {
    onClose: () => void;
    open: boolean;
    selectedTrainerData?: any;
}

const AddTrainer: React.FC<AddTrainerProps> = ({ onClose, open, selectedTrainerData }) => {
    const [form] = Form.useForm();
    const router = useRouter()
    const params = useParams()
    const token = useSelector((state: any) => state.user.loggedinUserData?.token);

    const [loading, setLoading] = useState(false);
    const [trainerData, setTrainerData] = useState<any>({});
    const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
    const currentGymBranchId = selectedBranch.id;
    const [capturedImage, setCapturedImage] = useState<string | null>(null);


    const { branches } = useSelector((state: any) => state.branch);

    const branchOptions = branches?.map((branch: any) => ({
        value: branch.id,
        label: branch.name,
    }));

    useEffect(() => {
        if (params.editTrainerId === 'add') return;

        const fetchTrainerById = async () => {
            setLoading(true);
            try {
                const data = await getRequest(`/api/trainers/${params.editTrainerId}?gymBranchId=${currentGymBranchId}`);
                setTrainerData(data.data);
            } catch (error) {
                // Optionally handle error
                setTrainerData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainerById();
    }, [])

    const base64ToBlob = (base64Data: string, contentType = 'image/jpeg') => {
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i += 512) {
            const slice = byteCharacters.slice(i, i + 512);
            const byteNumbers = new Array(slice.length);
            for (let j = 0; j < slice.length; j++) {
                byteNumbers[j] = slice.charCodeAt(j);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    };

    const handleFinish = async (values: any) => {
        if (params.editTrainerId === 'add') {
            const formData = new FormData();

            // Append userData
            formData.append("userData", JSON.stringify({
                fullName: values.fullName,
                email: values.email,
                role: 'TRAINER',
                phone: values.phone,
                address: values.address,
                birthDate: values.birthDate,
            }));

            // Append trainerData
            formData.append("trainerData", JSON.stringify({
                referenceMobileNo: values.referenceMobileNo,
                gender: values.gender || "MALE",
                specialization: values.specialization,
                workType: values.workType,
                joiningDate: values.joiningDate || new Date().toISOString(),
                experienceYears: Number(values.experienceYears),
                gymBranchId: values.gymBranchId,
            }));

            // Append image if available
            if (capturedImage) {
                const imageBlob = base64ToBlob(capturedImage);
                formData.append("image", imageBlob, "trainer-photo.jpg");
            }

            try {
                const apiurl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiurl}/api/trainers`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                toast.success("Trainer created successfully");
                // Navigate to trainer listing
                router.push("/management/trainer/trainer");
                console.log(response, "Trainer created");
            } catch (error) {
                console.error("Trainer creation failed:", error);
                toast.error("Failed to create trainer");
            }

        } else {
            const payload = {
                userData: {
                    fullName: values.fullName || trainerData && trainerData?.user?.fullName,
                    email: values.email || trainerData && trainerData?.user?.email,
                    role: 'TRAINER',
                    phone: values.phone || trainerData && trainerData?.user?.phone,
                    birthDate: values.birthDate || trainerData && trainerData?.user?.birthDate,
                },
                trainerData: {
                    referenceMobileNo: values.referenceMobileNo || trainerData && trainerData?.referenceMobileNo,
                    specialization: values.specialization || trainerData && trainerData?.specialization,
                    experienceYears: Number(values.experienceYears) || Number(trainerData && trainerData?.experienceYears),
                    workType: values.workType || trainerData && trainerData?.workType,
                    gender: values.gender || trainerData && trainerData?.gender || "MALE",
                    joiningDate: values.joiningDate || trainerData?.joiningDate || new Date().toISOString(),
                    gymBranchId: values.gymBranchId,
                }
            };

            try {
                const response = await putRequest(`/api/trainers/${params.editTrainerId}?gymBranchId=${currentGymBranchId}`, payload);
                message.success("New Branch creared successfully")
                router.push("/management/trainer/trainer")
                console.log(response, "branch created");
            } catch (error) {
                console.error("Branch creation failed:", error);
            }
        }

        onClose()
    };

    const handleCancel = () => {
        onClose()
    }

    return (
        <main className='w-full h-full'>
            {loading ? (
                <div>
                    <Skeleton active />
                </div>
            ) : (
                <Form
                    form={form}
                    onFinish={handleFinish}
                    layout="vertical"
                    className='h-full flex flex-col justify-between gap-4'
                >
                    {/* user data */}
                    <div className='flex flex-col gap-4 h-[calc(100%-40px)]  overflow-y-scroll pr-2'>
                        <div className="px-4 max-w-md mx-auto flex flex-col items-center">
                            <h2 className="text-lg font-bold mb-3">Profile Image</h2>

                            <WebcamCapture onCapture={setCapturedImage} />

                            {capturedImage && (
                                <div className="mt-2">
                                    <p className="!mb-1 ">Captured Image:</p>
                                    <img
                                        src={capturedImage}
                                        alt="Captured"
                                        className="w-40 h-40 object-cover border rounded"
                                    />
                                </div>
                            )}
                        </div>

                        <FormInput
                            label='Trainer name'
                            name='fullName'
                            initialValue={trainerData && trainerData?.user?.fullName}
                        />
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <FormInput
                                label='Email'
                                name='email'
                                initialValue={trainerData && trainerData?.user?.email}
                            />

                            <FormInput
                                label='Mobile No.'
                                name='phone'
                                initialValue={trainerData && trainerData?.user?.phone}
                            />

                            <div className='col-span-2'>
                                <FormInput
                                    label='Address'
                                    name='address'
                                    initialValue={trainerData && trainerData?.address}
                                />
                            </div>

                            <FormInput
                                label='Reference Mobile No.'
                                name='referenceMobileNo'
                                initialValue={trainerData && trainerData?.referenceMobileNo}
                            />

                            <FormDate
                                label='Date of Birth'
                                name='birthDate'
                                initialValue={trainerData && trainerData?.user?.birthDate && dayjs(trainerData?.user?.birthDate)}
                            />

                            <FormMultiselect
                                label='Expertise'
                                name='specialization'
                                options={expertiseOptions}
                                initialValue={trainerData && trainerData?.specialization}
                            />

                            <FormInput
                                label='Experience (Years)'
                                name='experienceYears'
                                initialValue={trainerData && trainerData?.experienceYears}
                            />

                            <FormSelect
                                label='Work Type'
                                name='workType'
                                options={workTypeOption}
                                initialValue={trainerData && trainerData?.workType}
                            />

                            <FormSelect
                                label='Gender'
                                name='gender'
                                options={genderOption}
                                initialValue={trainerData && trainerData?.gender}
                            />

                            <FormDate
                                label='Joining Date'
                                name='joiningDate'
                                initialValue={trainerData?.joiningDate && dayjs(trainerData.joiningDate)}
                            />

                            <FormSelect
                                label='Branch Name'
                                name='gymBranchId'
                                options={branchOptions}
                                initialValue={trainerData && trainerData?.gymBranchId}
                            />

                        </div>

                        {/* <FormInput
                        label='Address'
                        name='address'
                    /> */}

                    </div>

                    {/* buttons */}
                    <div className='flex justify-start gap-4'>
                        <button
                            type='button'
                            onClick={() => handleCancel()}
                            className=' w-[147px] !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className=' w-[147px] !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer'
                        >
                            Add Trainer
                        </button>
                    </div>
                </Form>
            )}
        </main>
    )
}

export default AddTrainer
