import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, Smartphone, Palette, Lightbulb, CheckCircle } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimationWrapper animation="fade" duration={0.8} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Business with
              <span className="block mt-2">Innovative IT Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              We deliver cutting-edge web development, mobile apps, design, and IT consulting services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </AnimationWrapper>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="slideUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </AnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: 'Web Development',
                description: 'Modern, responsive websites built with cutting-edge technologies',
                color: 'text-blue-600 dark:text-blue-400',
              },
              {
                icon: Smartphone,
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile applications for iOS & Android',
                color: 'text-green-600 dark:text-green-400',
              },
              {
                icon: Palette,
                title: 'Graphic Design',
                description: 'Creative designs that bring your brand vision to life',
                color: 'text-pink-600 dark:text-pink-400',
              },
              {
                icon: Lightbulb,
                title: 'IT Consulting',
                description: 'Strategic technology consulting for digital transformation',
                color: 'text-purple-600 dark:text-purple-400',
              },
            ].map((service, index) => (
              <AnimationWrapper
                key={index}
                animation="scale"
                delay={index * 0.1}
                className="h-full"
              >
                <div
                  className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 h-full"
                >
                  <service.icon className={`w-12 h-12 ${service.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              </AnimationWrapper>
            ))}
          </div>

          <AnimationWrapper animation="fade" delay={0.4} className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimationWrapper>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimationWrapper animation="slideRight">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose CORENEX?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We combine technical expertise with creative innovation to deliver exceptional results for our clients.
              </p>
              <ul className="space-y-4">
                {[
                  'Expert team of developers and designers',
                  'Cutting-edge technologies and best practices',
                  'On-time delivery and transparent communication',
                  'Scalable solutions that grow with your business',
                  'Dedicated support and maintenance',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimationWrapper>
            <AnimationWrapper animation="slideLeft" className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/why-us.jpg"
                alt="Why Choose CORENEX"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <AnimationWrapper animation="scale" className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Let's discuss how we can help transform your ideas into reality
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Contact Us Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </AnimationWrapper>
      </section>
    </div>
  );
}
