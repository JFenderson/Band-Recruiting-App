//Recruiter Management: If schools can have multiple recruiters, components to manage them.
'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { StarIcon, MessageCircleIcon, UserIcon, UsersIcon } from "lucide-react"
import React from 'react'

export default function RecruiterDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null)

  const students = [
    { id: 1, name: "Alice Johnson", instrument: "Piano", location: "New York", avatar: "/placeholder.svg" },
    { id: 2, name: "Bob Smith", instrument: "Guitar", location: "Los Angeles", avatar: "/placeholder.svg" },
    { id: 3, name: "Charlie Brown", instrument: "Drums", location: "Chicago", avatar: "/placeholder.svg" },
    { id: 4, name: "Diana Ross", instrument: "Vocals", location: "Miami", avatar: "/placeholder.svg" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-800">RecruiterHub</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Students
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  My Profile
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Messages
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Band Profiles
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Student Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input type="text" placeholder="Search students..." />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles</SelectItem>
                        <SelectItem value="chicago">Chicago</SelectItem>
                        <SelectItem value="miami">Miami</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Instrument" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piano">Piano</SelectItem>
                        <SelectItem value="guitar">Guitar</SelectItem>
                        <SelectItem value="drums">Drums</SelectItem>
                        <SelectItem value="vocals">Vocals</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Skill Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => setSelectedStudent(student)}>
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.instrument}, {student.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-2/3">
              {selectedStudent ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Student Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                        <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                        <p className="text-gray-500">{selectedStudent.instrument} | {selectedStudent.location}</p>
                        <p className="text-gray-500">Music School of New York</p>
                      </div>
                    </div>
                    <Tabs defaultValue="video1">
                      <TabsList>
                        <TabsTrigger value="video1">Video 1</TabsTrigger>
                        <TabsTrigger value="video2">Video 2</TabsTrigger>
                      </TabsList>
                      <TabsContent value="video1">
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      </TabsContent>
                      <TabsContent value="video2">
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="flex items-center space-x-2 mb-4">
                      <StarIcon className="text-yellow-400" />
                      <StarIcon className="text-yellow-400" />
                      <StarIcon className="text-yellow-400" />
                      <StarIcon className="text-yellow-400" />
                      <StarIcon className="text-gray-300" />
                      <span className="text-sm text-gray-500">(4.0)</span>
                    </div>
                    <Input type="text" placeholder="Add a comment..." className="mb-4" />
                    <div className="flex justify-between">
                      <Button>
                        <MessageCircleIcon className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="default">
                        Send Scholarship Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select a student to view their profile</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}