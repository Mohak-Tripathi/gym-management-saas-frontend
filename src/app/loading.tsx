'use client'
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Loading() {
    // Or a custom loading skeleton component
    return <p className="w-full h-screen flex flex-col justify-center items-center gap-2">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <span>
            Loading
        </span>
    </p>
}