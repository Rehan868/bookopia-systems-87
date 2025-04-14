
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertCircle,
  ArrowRight,
  BadgePercent,
  Building2,
  Cloud,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Save,
  User,
  Users
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Form states
  const [companyName, setCompanyName] = useState('HotelManager Co.');
  const [companyEmail, setCompanyEmail] = useState('info@hotelmanager.com');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currencyFormat, setCurrencyFormat] = useState('USD');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoCheckout, setAutoCheckout] = useState(true);
  
  // More advanced settings form states
  const [defaultCheckInTime, setDefaultCheckInTime] = useState('14:00');
  const [defaultCheckOutTime, setDefaultCheckOutTime] = useState('11:00');
  const [taxRate, setTaxRate] = useState('7.5');
  const [reminderDays, setReminderDays] = useState('1');
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveProperty = () => {
    toast({
      title: "Property Settings Saved",
      description: "Your property settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleSaveUsers = () => {
    toast({
      title: "User Settings Saved",
      description: "User access settings have been updated successfully.",
    });
  };
  
  const handleSaveIntegrations = () => {
    toast({
      title: "Integration Settings Saved",
      description: "Your integration settings have been updated.",
    });
  };
  
  const handleSaveBilling = () => {
    toast({
      title: "Billing Information Updated",
      description: "Your billing details have been saved.",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been saved.",
    });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and configuration</p>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-8"
      >
        <div className="bg-card border rounded-md p-1 sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto w-full">
            <TabsTrigger value="general" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>General</span>
                </div>
                <span className="text-xs text-muted-foreground">Basic settings</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="property" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Properties</span>
                </div>
                <span className="text-xs text-muted-foreground">Location settings</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="notifications" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Notifications</span>
                </div>
                <span className="text-xs text-muted-foreground">Email, SMS</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="users" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </div>
                <span className="text-xs text-muted-foreground">Access control</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="integrations" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  <span>Integrations</span>
                </div>
                <span className="text-xs text-muted-foreground">APIs, services</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="billing" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </div>
                <span className="text-xs text-muted-foreground">Subscription</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="security" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </div>
                <span className="text-xs text-muted-foreground">Authentication</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic settings for your hotel management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      This will appear on all invoices and emails
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Company Email</Label>
                    <Input 
                      id="company-email" 
                      type="email" 
                      value={companyEmail} 
                      onChange={(e) => setCompanyEmail(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      This email will be used for system notifications
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select 
                      value={dateFormat} 
                      onValueChange={setDateFormat}
                    >
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={currencyFormat} 
                      onValueChange={setCurrencyFormat}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Behavior</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send email notifications for bookings and check-ins
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-checkout">Automatic Checkout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check out guests at the scheduled checkout time
                    </p>
                  </div>
                  <Switch
                    id="auto-checkout"
                    checked={autoCheckout}
                    onCheckedChange={setAutoCheckout}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-checkin">Default Check-in Time</Label>
                    <Input 
                      id="default-checkin" 
                      type="time" 
                      value={defaultCheckInTime} 
                      onChange={(e) => setDefaultCheckInTime(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-checkout">Default Check-out Time</Label>
                    <Input 
                      id="default-checkout" 
                      type="time" 
                      value={defaultCheckOutTime} 
                      onChange={(e) => setDefaultCheckOutTime(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input 
                      id="tax-rate" 
                      type="number" 
                      value={taxRate} 
                      onChange={(e) => setTaxRate(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Reminder Days</Label>
                    <Input 
                      id="reminder-days" 
                      type="number" 
                      value={reminderDays} 
                      onChange={(e) => setReminderDays(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      Days before check-in to send reminder emails
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveGeneral} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure backups and data export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Automated Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The system automatically backs up your data every day at midnight.
                  </p>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Data Export</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export your system data in various formats.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Export as CSV</Button>
                    <Button variant="outline">Export as JSON</Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-amber-50">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-800">Data Retention Policy</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      By default, the system retains booking data for 7 years. Audit logs are kept for 2 years.
                      You can modify these settings in the security tab.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="property" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Management</CardTitle>
              <CardDescription>
                Configure your hotel properties and locations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Properties</h3>
                
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left font-medium p-3">Name</th>
                        <th className="text-left font-medium p-3">Address</th>
                        <th className="text-left font-medium p-3">Rooms</th>
                        <th className="text-right font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Marina Tower</td>
                        <td className="p-3">123 Oceanfront Dr, Miami, FL</td>
                        <td className="p-3">12</td>
                        <td className="p-3 text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Downtown Heights</td>
                        <td className="p-3">456 Urban Ave, Miami, FL</td>
                        <td className="p-3">8</td>
                        <td className="p-3 text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Button>Add New Property</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-property">Default Property</Label>
                    <Select defaultValue="marina">
                      <SelectTrigger id="default-property">
                        <SelectValue placeholder="Select default property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marina">Marina Tower</SelectItem>
                        <SelectItem value="downtown">Downtown Heights</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      This property will be selected by default when creating new bookings
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Property Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-notes">Property Notes</Label>
                  <Textarea 
                    id="property-notes" 
                    placeholder="Enter any special instructions or notes for this property"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-on-booking">Show on Booking Sites</Label>
                    <Switch id="show-on-booking" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable this to make your properties visible on connected booking platforms
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveProperty} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Property Settings
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Room Types & Pricing</CardTitle>
              <CardDescription>
                Manage room categories and rate plans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left font-medium p-3">Room Type</th>
                      <th className="text-left font-medium p-3">Base Rate</th>
                      <th className="text-left font-medium p-3">Max Occupancy</th>
                      <th className="text-right font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Standard Room</td>
                      <td className="p-3">$120</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Deluxe Suite</td>
                      <td className="p-3">$180</td>
                      <td className="p-3">3</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Executive Suite</td>
                      <td className="p-3">$250</td>
                      <td className="p-3">4</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Penthouse Suite</td>
                      <td className="p-3">$400</td>
                      <td className="p-3">4</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex gap-3">
                <Button>Add Room Type</Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <BadgePercent className="h-4 w-4" />
                  Manage Rate Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Configure the email and SMS templates sent to guests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">Email Templates</h3>
                  <div className="rounded-md border overflow-hidden divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Booking Confirmation</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-in Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-out Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Thank You</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Cancellation</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">SMS Templates</h3>
                  <div className="rounded-md border overflow-hidden divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Booking Confirmation</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-in Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-out Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline">Add SMS Template</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Template Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Use these variables in your templates to insert dynamic content:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{guest_name}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Guest's full name</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{booking_ref}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Booking reference</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{check_in_date}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Check-in date</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{check_out_date}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Check-out date</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{room_type}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Room type name</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{room_number}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Room number</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email-sender">Sender Email</Label>
                    <Input id="email-sender" defaultValue="bookings@hotelmanager.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-reply-to">Reply-to Email</Label>
                    <Input id="email-reply-to" defaultValue="support@hotelmanager.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-footer">Email Footer Text</Label>
                  <Textarea 
                    id="email-footer" 
                    defaultValue="HotelManager Inc. | 123 Hotel St, Miami, FL | (555) 123-4567" 
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Events</CardTitle>
              <CardDescription>
                Configure when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Booking Confirmation</Label>
                    <p className="text-sm text-muted-foreground">
                      Send an email when a booking is created or modified
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Check-in Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a reminder before guest arrival
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Check-out Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a reminder on the day of departure
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Post-stay Thank You</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a thank you email after checkout
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Cancellation Notice</Label>
                    <p className="text-sm text-muted-foreground">
                      Send an email when a booking is cancelled
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Staff Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications to staff for new bookings and changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left font-medium p-3">Name</th>
                      <th className="text-left font-medium p-3">Email</th>
                      <th className="text-left font-medium p-3">Role</th>
                      <th className="text-left font-medium p-3">Status</th>
                      <th className="text-right font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="font-medium">John Doe</span>
                        </div>
                      </td>
                      <td className="p-3">john@example.com</td>
                      <td className="p-3">Administrator</td>
                      <td className="p-3">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Jane Smith</span>
                        </div>
                      </td>
                      <td className="p-3">jane@example.com</td>
                      <td className="p-3">Manager</td>
                      <td className="p-3">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Robert Wilson</span>
                        </div>
                      </td>
                      <td className="p-3">robert@example.com</td>
                      <td className="p-3">Staff</td>
                      <td className="p-3">
                        <Badge className="bg-red-100 text-red-800">Inactive</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Button>Add New User</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure access levels for each user role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Administrator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Full Access</Label>
                    <Switch checked disabled />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Manager</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Manage Bookings</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Manage Rooms</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>View Reports</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Manage Staff</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>System Settings</Label>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Staff</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>View Bookings</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Create Bookings</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Check In/Out</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>View Rooms</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <Label>Edit Rooms</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveUsers} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save User Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>
                Manage integrations with external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border overflow-hidden divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Booking.com</h3>
                      <p className="text-sm text-muted-foreground">Connected on May 12, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                    <Button variant="ghost" size="sm">Disconnect</Button>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-red-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Airbnb</h3>
                      <p className="text-sm text-muted-foreground">Connected on June 3, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                    <Button variant="ghost" size="sm">Disconnect</Button>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Expedia</h3>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <div>
                    <Button>Connect</Button>
                  </div>
                </div>
              </div>
              
              <Button>Add New Integration</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Configure API keys and access for external developers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border overflow-hidden divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Production API Key</h3>
                    <p className="text-sm text-muted-foreground">For live environment integration</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Regenerate</Button>
                    <Button variant="outline" size="sm">Copy Key</Button>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Test API Key</h3>
                    <p className="text-sm text-muted-foreground">For development and testing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Regenerate</Button>
                    <Button variant="outline" size="sm">Copy Key</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Rate Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Requests per minute</Label>
                    <Input id="rate-limit" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daily-limit">Daily request limit</Label>
                    <Input id="daily-limit" type="number" defaultValue="10000" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-blue-50">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-800">API Documentation</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      View our API documentation to learn more about how to integrate with our system.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      View Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveIntegrations} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Integration Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your current plan and billing cycle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        PRO
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Professional Plan</h3>
                        <p className="text-sm text-muted-foreground">$129 per month, billed annually</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Unlimited bookings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Up to 50 rooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Premium support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>All integrations</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">NEXT BILLING DATE</h4>
                    <p className="text-lg font-medium">Jan 1, 2024</p>
                  </div>
                  <Button className="w-full">Change Plan</Button>
                  <Button variant="outline" className="w-full">Billing History</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-10 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center text-white font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </div>
              
              <div className="p-4 border rounded-md bg-amber-50">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-800">Need Help?</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Contact our billing support team for assistance with your subscription.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveBilling} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Billing Information
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage authentication and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all administrative accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out inactive users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout Duration (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input id="max-attempts" type="number" defaultValue="5" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Select password policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Protection</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">
                      Encrypt sensitive data at rest
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Track all changes and access to the system
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period (years)</Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    How long to keep booking and guest data
                  </p>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-red-50">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-800">Security Alert</h4>
                    <p className="text-sm text-red-700 mt-1">
                      The system will automatically lock accounts after 5 failed login attempts.
                      Please contact an administrator to unlock accounts.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveSecurity} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Security Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
