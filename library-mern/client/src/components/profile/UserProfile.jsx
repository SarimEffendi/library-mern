import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserProfile() {
    const [username, setUsername] = useState('johndoe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSaveProfile = () => {
        console.log('Profile saved:', { username, email });
    };

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            console.log('Password changed');
        } else {
            console.error('Passwords do not match');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">John Doe</h1>
                        <p className="text-muted-foreground">@johndoe</p>
                    </div>
                </div>
                <div className="w-full space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Profile Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button className="ml-auto" onClick={handleSaveProfile}>Save</Button>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-4">Change Password</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <Button className="ml-auto" onClick={handleChangePassword}>Change Password</Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
