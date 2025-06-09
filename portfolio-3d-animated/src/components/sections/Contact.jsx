import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (data) => {
        // Handle form submission logic here (e.g., send data to an API)
        console.log(data);
        setSubmitted(true);
    };

    return (
        <section className="contact-section">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <input
                    type="text"
                    placeholder="Your Name"
                    {...register('name', { required: true })}
                    className={`mb-4 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}

                <input
                    type="email"
                    placeholder="Your Email"
                    {...register('email', { required: true })}
                    className={`mb-4 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <span className="text-red-500">This field is required</span>}

                <textarea
                    placeholder="Your Message"
                    {...register('message', { required: true })}
                    className={`mb-4 p-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.message && <span className="text-red-500">This field is required</span>}

                <Button type="submit" text="Send Message" />
            </form>
            {submitted && <p className="mt-4 text-green-500">Thank you for your message!</p>}
        </section>
    );
};

export default Contact;