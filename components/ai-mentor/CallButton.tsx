'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Loader2, AlertCircle, Check, Info, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface CallButtonProps {
  assistantId?: string;
}

export default function CallButton({ assistantId }: CallButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('+917738705798'); // Default number
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const { toast } = useToast();

  // Validate phone number in E.164 format
  const validatePhoneNumber = (number: string) => {
    // Basic E.164 validation: + followed by numbers only
    const isValid = /^\+[0-9]{10,15}$/.test(number);
    setIsValidNumber(isValid);
    return isValid;
  };

  // Handle phone number change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Only validate if there's input
    if (value.trim()) {
      validatePhoneNumber(value);
    } else {
      setIsValidNumber(true); // Reset validation for empty field
    }
  };

  // Format phone number to E.164
  const formatToE164 = (number: string) => {
    // Remove all non-digit characters except the + at the beginning
    let formatted = number.replace(/[^\d+]/g, '');

    // Ensure it starts with a +
    if (!formatted.startsWith('+')) {
      formatted = '+' + formatted;
    }

    return formatted;
  };

  const initiateCall = async () => {
    try {
      // Format and validate the phone number first
      const formattedNumber = formatToE164(phoneNumber);
      if (!validatePhoneNumber(formattedNumber)) {
        setErrorMessage('Please enter a valid phone number in international format (e.g., +917738705798)');
        toast({
          variant: "destructive",
          title: "Invalid Phone Number",
          description: "Please enter a valid international phone number with country code.",
        });
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      console.log('Starting call to:', formattedNumber, 'with assistant:', assistantId);

      // Show initiating call toast
      toast({
        title: "Initiating Call",
        description: "Please wait while we connect your call...",
      });

      const response = await fetch('/api/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedNumber,
          assistantId: assistantId,
        }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        const errorMsg = data.error || 'Failed to initiate call';
        console.error('Error response:', errorMsg);
        setErrorMessage(errorMsg);

        // Show error toast
        toast({
          variant: "destructive",
          title: "Call Failed",
          description: errorMsg,
        });

        throw new Error(errorMsg);
      }

      // Handle successful response
      console.log('Call initiated successfully:', data);

      // Clear any previous error
      setErrorMessage(null);

      // Check if the response has an id property
      if (data && data.id) {
        // Store call ID and show success dialog
        setCallId(data.id);
        setShowSuccessDialog(true);

        // Also show toast for non-disruptive notification
        toast({
          title: "Call Initiated Successfully!",
          description: `Your phone will ring shortly. Call ID: ${data.id.substring(0, 8)}...`,
          variant: "default",
        });
      } else {
        console.warn('Call initiated but no ID was returned:', data);
        // Show success dialog without ID
        setCallId(null);
        setShowSuccessDialog(true);

        toast({
          title: "Call Initiated Successfully!",
          description: "Your phone will ring shortly.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      const msg = error instanceof Error ? error.message : 'Failed to initiate call. Please try again.';
      setErrorMessage(msg);

      // Show error toast if not already shown
      toast({
        variant: "destructive",
        title: "Error",
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-700">
            Phone Number
          </Label>
          <div className="relative">
            <Input
              id="phoneNumber"
              type="text"
              placeholder="+917738705798"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={isLoading}
              className={`pl-3 pr-10 py-2 ${!isValidNumber ? 'border-[#FF647C] focus:ring-[#FF647C] focus:border-[#FF647C]' : 'border-gray-300 focus:ring-[#5C5FFF] focus:border-[#5C5FFF]'}`}
            />
            {!isValidNumber && (
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <AlertCircle className="h-5 w-5 text-[#FF647C]" />
              </div>
            )}
          </div>

          {!isValidNumber && (
            <p className="mt-1 text-sm text-[#FF647C]">
              Please enter a valid international phone number with country code
            </p>
          )}

          <p className="text-xs text-gray-500">
            Format: Include country code with + (e.g., +917738705798)
          </p>
        </div>

        <Button
          onClick={initiateCall}
          disabled={isLoading || !isValidNumber}
          className="w-full bg-[#5C5FFF] hover:bg-[#5C5FFF]/90 text-white transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initiating call...
            </>
          ) : (
            <>
              <Phone className="mr-2 h-4 w-4" />
              Start Call
            </>
          )}
        </Button>

        {errorMessage && (
          <div className="flex items-start gap-2 p-3 rounded bg-[#FF647C]/10 text-[#FF647C] text-sm">
            <AlertCircle className="h-5 w-5 text-[#FF647C] flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md border-0 shadow-xl">
          <DialogHeader>
            <div className="mx-auto bg-[#00C2D1]/20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-9 w-9 text-[#00C2D1]" />
            </div>
            <DialogTitle className="text-center text-xl">Call Sent Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your AI Mentor will call you shortly at {phoneNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col space-y-3 p-4 bg-[#5C5FFF]/10 rounded-md">
            <div className="flex justify-center items-center gap-2">
              <PhoneCall className="h-5 w-5 text-[#5C5FFF]" />
              <p className="text-[#5C5FFF] font-medium">Get ready to answer your phone</p>
            </div>

            {callId && (
              <div className="bg-white p-3 rounded text-center">
                <p className="text-xs text-gray-500">Call Reference ID:</p>
                <p className="font-mono text-sm text-gray-700 break-all">{callId}</p>
              </div>
            )}
            
            <p className="text-sm text-[#5C5FFF]/80 text-center">
              Please answer the incoming call to start your AI Mentor session
            </p>
          </div>
          
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-[#5C5FFF] hover:bg-[#5C5FFF]/90 text-white transition-colors"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 