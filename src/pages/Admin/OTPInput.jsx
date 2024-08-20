import { useState } from "react";

const OTPInput = ({ otp, setOtp }) => {
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      console.log(otp);

      // Move focus to the next input
      if (value && index < 6) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          maxLength="1"
          className="lg:w-12 lg:h-12 h-8 w-8 text-black outline-gray-300  text-center border border-gray-300 rounded"
        />
      ))}
    </div>
  );
};

export default OTPInput;
