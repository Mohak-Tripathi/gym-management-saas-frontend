import SubscriptionCard from "@/components/SubscriptionCard";
import React from "react";


const SubscriptionDetail = () => {
  return (
    // <div>
    //   <SubscriptionCard planTitle="Basic Plan" duration="Monthly" actualPrice="32500" discountedPrice="2850"/>
    // </div>

<div>
<SubscriptionCard
  planTitle="Basic Plan"
  duration="Monthly" // if "Monthly" means 1 month
  actualPrice={32500}
  discountedPrice={2850}
/>
</div>
  );
};

export default SubscriptionDetail;
