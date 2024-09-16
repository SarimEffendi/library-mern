import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

export default function Hero() {
    return (
        <section className="w-full bg-gradient-to-b from-primary to-primary-foreground py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col gap-8 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Explore Our Library
                    </h1>
                    <p className="max-w-[700px] text-lg md:text-xl">
                        Discover a world of knowledge at your fingertips. Browse our
                        extensive collection of books and check out your favorites.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Input
                            type="search"
                            placeholder="Search books..."
                            className="flex-1 rounded-md bg-primary-foreground/20 px-4 py-2 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                        />
                        <div className="flex gap-2">
                            <Link
                                to="/book-list"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground/50"
                            >
                                Browse Library
                            </Link>
                            <Link
                                to="#"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground/50"
                            >
                                Check Out
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
                    <Carousel className="absolute inset-0 h-full w-full">
                        <CarouselContent>
                            <CarouselItem>
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_lg.jpg"
                                        alt="Book Cover 1"
                                        width={300}
                                        height={450}
                                        className="h-full w-auto max-w-[300px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
                                        style={{ aspectRatio: "300/450", objectFit: "cover" }}
                                    />
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_lg.jpg"
                                        alt="Book Cover 2"
                                        width={300}
                                        height={450}
                                        className="h-full w-auto max-w-[300px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
                                        style={{ aspectRatio: "300/450", objectFit: "cover" }}
                                    />
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_lg.jpg"
                                        alt="Book Cover 3"
                                        width={300}
                                        height={450}
                                        className="h-full w-auto max-w-[300px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
                                        style={{ aspectRatio: "300/450", objectFit: "cover" }}
                                    />
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_lg.jpg"
                                        alt="Book Cover 4"
                                        width={300}
                                        height={450}
                                        className="h-full w-auto max-w-[300px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
                                        style={{ aspectRatio: "300/450", objectFit: "cover" }}
                                    />
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_lg.jpg"
                                        alt="Book Cover 5"
                                        width={300}
                                        height={450}
                                        className="h-full w-auto max-w-[300px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
                                        style={{ aspectRatio: "300/450", objectFit: "cover" }}
                                    />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground/50">
                            <ChevronLeftIcon className="h-6 w-6" />
                        </CarouselPrevious>
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground/50">
                            <ChevronRightIcon className="h-6 w-6" />
                        </CarouselNext>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

function ChevronLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
