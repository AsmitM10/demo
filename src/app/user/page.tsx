// app/user/page.tsx
"use client";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

export default function UserPage() {
  const [refLink] = useState("https://bsfitness/Asmit_10");

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    alert("Referral link copied!");
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=Join%20me%20for%20FREE%207%20days%20fitness%20sessions!%20${encodeURIComponent(
        refLink
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar userName="Asmit Mirkar" />

      {/* Main Content */}
      <main className="flex-1 p-8 ml-56"> {/* add ml-56 to match sidebar width */}
        {/* Top Card */}
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
                alt="Fitness"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  ▶ Join Now
                </Button>
              </div>
              <p className="absolute top-3 left-3 text-white font-semibold">
                Live Fitness Sessions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="invite">
          <TabsList>
            <TabsTrigger value="invite">Invite Friends</TabsTrigger>
            <TabsTrigger value="attendance">My Attendance</TabsTrigger>
          </TabsList>

          {/* Invite Friends */}
          <TabsContent value="invite">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">INVITE FRIENDS</h3>
                <p>Friends will also get FREE 7 Days Sessions</p>
                <div>
                  <p className="font-semibold">How to Refer?</p>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>
                      Click on “Share on WhatsApp” above to generate your
                      customised link
                    </li>
                    <li>Share it with your Friends / Family members</li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                  <Input value={refLink} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyLink}
                    className="shrink-0"
                  >
                    <Copy size={18} />
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={shareWhatsApp}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">My Attendance</h3>
                <p className="text-gray-600 mt-2">
                  Attendance details will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
