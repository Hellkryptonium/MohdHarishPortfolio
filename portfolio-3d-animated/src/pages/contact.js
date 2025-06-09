import React from 'react';
import Layout from '../components/layout/Layout';
import { useForm } from 'react-hook-form';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Here you would typically handle the form submission, e.g., sending data to an API
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: true })}
                            className={`border rounded w-full py-2 px-3 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                            className={`border rounded w-full py-2 px-3 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            {...register('message', { required: true })}
                            className={`border rounded w-full py-2 px-3 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.message && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Send Message
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Contact;