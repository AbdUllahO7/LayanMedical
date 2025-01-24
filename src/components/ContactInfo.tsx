"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { FloatingDockDemo } from "./FloatingDockDemo"

export function ContactInfo() {
  const contactItems = [
    { icon: MapPin, title: "Address", content: "123 Main St, Anytown, ST 12345" },
    { icon: Phone, title: "Phone", content: "(123) 456-7890" },
    { icon: Mail, title: "Email", content: "contact@example.com" },
  ]

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2 ">
      <div>
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-logoColor to-lightColor">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We're here to help and answer any question you might have. We look forward to hearing from you!
        </p>
        <Card className="">
          <CardContent className="p-6">
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-lightColor" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
              <FloatingDockDemo/>
          </div>
        </div>
      </div>
      <div className="relative h-[400px] md:h-full min-h-[400px] lg:w-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784890000001!3d40.7516208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1644332380105!5m2!1sen!2sus"
          className="absolute inset-0 w-full h-full rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  )
}

