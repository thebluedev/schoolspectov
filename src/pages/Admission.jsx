import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Admission = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    DOB: "",
    city: "",
    number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.DOB) newErrors.DOB = "Date of Birth is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.number) newErrors.number = "Mobile Number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          from_DOB: form.DOB,
          from_city: form.city,
          from_number: form.number,
          to_name: "Prakashplayschool",
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          alert(
            "Thank you for reaching to us. We will get back to you as soon as possible😊.",
          );
          setForm({
            name: "",
            email: "",
            DOB: "",
            city: "",
            number: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        },
      );
  };

  return (
    <div className="align-center mt-24 flex h-full w-screen justify-center">
      <div className="w-100">
        <h1 className="text-4xl font-bold">Admission Enquiry Form</h1>
        <h2>Fill out this form and we'll contact you!</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-2"
        >
          <label className="flex flex-col">
            <span className="mb-2 text-black">Child's Date of Birth*</span>
            <input
              type="date"
              name="DOB"
              value={form.DOB}
              onChange={handleChange}
              placeholder="What's your child's age?"
              className="bg-tertiary w-[24rem] rounded-lg border-none px-6 py-4 text-black outline-none placeholder:text-black"
              required
            />
            {errors.DOB && <span className="text-red-500">{errors.DOB}*</span>}
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-black">Your Name*</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-tertiary rounded-lg border-none px-6 py-4 text-black outline-none placeholder:text-black"
              required
            />
            {errors.name && (
              <span className="text-red-500">{errors.name}*</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-black">Your Mobile Number*</span>
            <input
              type="number"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Your Mobile Number"
              className="bg-tertiary rounded-lg border-none px-6 py-4 text-black outline-none placeholder:text-black"
              required
            />
            {errors.number && (
              <span className="text-red-500">{errors.number}*</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-black">Email*</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email ID"
              className="bg-tertiary rounded-lg border-none px-6 py-4 text-black outline-none placeholder:text-black"
              required
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}*</span>
            )}
          </label>
          <label className="flex flex-col w-fill">
            <span className="mb-2 text-black  w-fill">Your City*</span>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Your City"
              className="bg-tertiary  rounded-lg b px-6 py-4 text-black outline-none placeholder:text-black"
              required
            />
            {errors.city && (
              <span className="text-red-500">{errors.city}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-black">
              Any questions or extra details?
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="bg-tertiary placeholder:text-md border-1 rounded-lg border-solid border-black bg-[#dcdcdc] px-6 py-4 text-black outline-none placeholder:text-black"
            />
            {errors.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </label>
          <button
            type="submit"
            className="bg-tertiary w-fill text-md shadow-primary rounded-xl bg-gray-400 px-8 py-3 text-[1.5rem] font-bold text-black shadow-md"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      {/* <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <div className="contact-img">
          <img src="/c2.png" alt="Contact Image" />
        </div>
      </div> */}
    </div>
  );
};

export default Admission;
