'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmissionStatus('idle');
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

      if (!serviceId || !templateId || !userId) {
        console.error('EmailJS environment variables are not set.');
        setSubmissionStatus('error');
        return;
      }

      // Fix: Cast form data to any for EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data as any, // Fix: cast to any to satisfy Record<string, unknown>
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      setSubmissionStatus('success');
      reset();
      setTimeout(() => setSubmissionStatus('idle'), 5000); // Reset status after 5s
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-background to-background/90 text-foreground">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="bg-card/60 backdrop-blur-md border-accent/20 shadow-lg overflow-hidden">
            <CardHeader>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="text-4xl md:text-5xl font-bold text-center text-primary"
              >
                Let's Connect
              </motion.h2>
              <p className="text-center text-muted-foreground mt-2">
                Have a question or want to work together? Reach out below.
              </p>
            </CardHeader>

            <CardContent>
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              >
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-accent">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    {...register('name', { required: 'Name is required' })}
                    className={`bg-background/60 border ${
                      errors.name ? 'border-secondary' : 'border-border'
                    } focus-visible:ring-accent focus-visible:ring-1 transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-secondary">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-accent">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`bg-background/60 border ${
                      errors.email ? 'border-secondary' : 'border-border'
                    } focus-visible:ring-accent focus-visible:ring-1 transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-secondary">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-accent">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your thoughts, questions, or project ideas..."
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className={`bg-background/60 border ${
                      errors.message ? 'border-secondary' : 'border-border'
                    } focus-visible:ring-accent focus-visible:ring-1 transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-secondary">{errors.message.message}</p>
                  )}
                </div>

                <Separator className="my-2 bg-accent/20" />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting || submissionStatus === 'success'}
                    className="bg-primary hover:bg-accent text-white font-medium px-8 py-2 shadow-lg transition-all duration-300 gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative group"
                    aria-label="Send message"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 transform group-hover:-rotate-12 transition-transform duration-300" />
                    )}
                    {isSubmitting
                      ? 'Sending...'
                      : submissionStatus === 'success'
                      ? 'Message Sent!'
                      : 'Send Message'}
                    {/* 3D envelope animation on success */}
                    {submissionStatus === 'success' && (
                      <span className="absolute left-1/2 -translate-x-1/2 -top-10 animate-fly-envelope">
                        <svg
                          width="40"
                          height="28"
                          viewBox="0 0 40 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="6"
                            width="36"
                            height="20"
                            rx="4"
                            fill="#8C52FF"
                            fillOpacity="0.8"
                          />
                          <path d="M2 6L20 20L38 6" stroke="#fff" strokeWidth="2" />
                        </svg>
                      </span>
                    )}
                  </Button>
                </div>
              </motion.form>
            </CardContent>

            <CardFooter className="flex justify-center">
              {submissionStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-accent/20 text-accent rounded-md flex items-center gap-2 w-full justify-center"
                >
                  <CheckCircle className="w-5 h-5" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {submissionStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-secondary/20 text-secondary rounded-md flex items-center gap-2 w-full justify-center"
                >
                  <AlertTriangle className="w-5 h-5" />
                  Oops! Something went wrong. Please try again or contact me directly.
                </motion.div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

/* Add to the bottom of the file (or in globals.css):
.animate-fly-envelope {
  animation: flyEnvelope 1.2s cubic-bezier(.4,1.6,.6,1) forwards;
}
@keyframes flyEnvelope {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  80% {
    opacity: 1;
    transform: translateY(-60px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-120px) scale(0.7);
  }
} */
