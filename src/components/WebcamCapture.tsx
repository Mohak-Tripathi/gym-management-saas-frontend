'use client';

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Modal, Button } from 'antd';
import Image from 'next/image';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const WebcamCapture = ({ onCapture }: { onCapture: (imgSrc: string) => void }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      closeModal();
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={openModal} className='!bg-black-primary'>
        Open Webcam
      </Button> */}

      <div
        onClick={openModal}
        className='h-[32px] w-[120px] rounded-[66px] border-[1px] border-solid border-black-10 py-1.5 pl-3 pr-2 flex items-center justify-center gap-2.5 cursor-pointer'>
        <Image
          src={`/images/iconly/light/webcam.svg`}
          height={0}
          width={0}
          alt='webcam'
          className='h-[20px] w-[20px]'
        />
        <p className='font-roboto font-semibold text-[12px] leading-[100%] tracking-[0px] align-middl text-black-primary !m-0'>Web Cam</p>
      </div>

      <Modal
        title="Take a Picture"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="capture" type="primary" onClick={capture} className='!bg-black-primary'>
            Capture
          </Button>,
        ]}
        width={1280}
        centered
      >
        <div className="flex justify-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png" // or "image/jpeg"
            screenshotQuality={1}
            videoConstraints={videoConstraints}
            mirrored
            className="rounded shadow"
            width={1280}
            height={720}
          />

        </div>
      </Modal>
    </>
  );
};

export default WebcamCapture;
