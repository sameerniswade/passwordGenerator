import React, { useCallback, useEffect, useState, useRef } from "react";
//ui

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

function PasswordGenerator({ className, ...props }) {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setlength] = useState(8);
  const passwordRef = useRef();
  const { toast } = useToast();
  useEffect(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <Card className={cn("w-[500px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-2">
        <Input
          type="text"
          readOnly
          placeholder="Password"
          value={password}
          ref={passwordRef}
        />
        <Button
          variant=""
          onClick={() => {
            copyPasswordToClipboard();
            toast({
              variant: "default",
              title: "Password copied to clipboard",
            });
          }}
        >
          Copy
        </Button>
      </CardContent>

      <CardFooter className="flex w-full gap-7">
        <div className="flex w-2/4 gap-2">
          <Slider
            defaultValue={[8]}
            max={16}
            step={1}
            className={cn("w-[100%]", className)}
            onValueChange={(e) => setlength(e)}
            {...props}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Length
          </Label>
        </div>

        <div className="items-top flex space-x-2 ">
          <Checkbox id="number" onCheckedChange={(e) => setNumberAllowed(e)} />
          <Label
            htmlFor="number"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Numbers
          </Label>
        </div>

        <div className="items-top flex space-x-2">
          <Checkbox id="number" onCheckedChange={(e) => setCharAllowed(e)} />
          <Label
            htmlFor="number"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Characters
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PasswordGenerator;
