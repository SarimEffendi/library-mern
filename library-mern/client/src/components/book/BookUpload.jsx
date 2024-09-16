import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { uploadBook } from "@/api/bookApi"; 
import {jwtDecode} from "jwt-decode"; 

export default function BookUpload() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        publishedDate: "",
        price: 0,
        rentalPrice: 0,
        availableForPurchase: false,
        availableForRental: false
    });

    const [user, setUser] = useState({ username: "", id: "" }); 

    useEffect(() => {
        const fetchUserFromToken = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUser({ username: decodedToken.username, id: decodedToken.id });
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        fetchUserFromToken();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSelectChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            ...formData,
            author: user.username, 
            authorId: user.id, 
        };

        try {
            const newBook = await uploadBook(bookData); 
            console.log("Book uploaded successfully:", newBook);
        } catch (error) {
            console.error("Error uploading book:", error);
        }
    };

    return (
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-4xl mx-auto p-6 sm:p-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Upload a Book</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            <div className="grid gap-1">
                                <Label htmlFor="title" className="text-sm font-medium">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter the book title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="description" className="text-sm font-medium">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Provide a brief description of the book"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1">
                                    <Label htmlFor="publishedDate" className="text-sm font-medium">
                                        Published Date
                                    </Label>
                                    <Input
                                        id="publishedDate"
                                        type="date"
                                        value={formData.publishedDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="price" className="text-sm font-medium">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="Enter the book price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1">
                                    <Label htmlFor="rentalPrice" className="text-sm font-medium">
                                        Rental Price
                                    </Label>
                                    <Input
                                        id="rentalPrice"
                                        type="number"
                                        placeholder="Enter the rental price"
                                        value={formData.rentalPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="availableForPurchase" className="text-sm font-medium">
                                        Availability
                                    </Label>
                                    <Select
                                        id="availableForPurchase"
                                        onValueChange={(value) =>
                                            handleSelectChange("availableForPurchase", value === "true")
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Available for Purchase</SelectItem>
                                            <SelectItem value="false">Not Available for Purchase</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1">
                                    <Label htmlFor="availableForRental" className="text-sm font-medium">
                                        Rental Availability
                                    </Label>
                                    <Select
                                        id="availableForRental"
                                        onValueChange={(value) =>
                                            handleSelectChange("availableForRental", value === "true")
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select rental availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Available for Rental</SelectItem>
                                            <SelectItem value="false">Not Available for Rental</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <CardFooter className="flex justify-end">
                                <Button type="submit">Upload Book</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
