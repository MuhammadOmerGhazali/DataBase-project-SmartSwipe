-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2024 at 10:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`Category`) VALUES
('Pants'),
('Shirt');

--
-- Dumping data for table `customercart`
--

INSERT INTO `customercart` (`CustomerID`, `ProductID`, `Quantity`) VALUES
('c2', 'p3', 5);

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerID`, `Email`, `Username`, `Password`, `Address`, `DateRegistered`, `Status`, `Type`) VALUES
('C1', 'customer1@example.com', 'customer1', 'password1', '123 Street, City', '2024-04-27', 'Active', 'Regular'),
('C2', 'customer2@example.com', 'customer2', 'password2', '456 Avenue, Town', '2024-04-27', 'Active', 'Regular');

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`FAQID`, `ProductID`, `Question`, `Answer`) VALUES
('f2', 'p3', 'What is color', 'Black');

--
-- Dumping data for table `orderedproducts`
--

INSERT INTO `orderedproducts` (`OrderID`, `ProductID`, `Quantity`) VALUES
('O2', 'p1', 9),
('O2', 'p2', 10);

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`CustomerID`, `OrderID`, `Date`, `TotalCost`, `OrderStatus`, `Address`) VALUES
('C2', '10', '2024-04-26', 100, 'Cancelled', '123 Street, City'),
('C2', 'O2', '2024-04-27', 150, 'Processing', '456 Avenue, Town');

--
-- Dumping data for table `paymentmethods`
--

INSERT INTO `paymentmethods` (`MethodID`, `PaymentMethodName`, `Type`) VALUES
('m2', 'JazzCah', 'Online');

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`PaymentMethod`, `PaymentStatus`, `OrderID`) VALUES
('m2', 'pending', '10'),
('m2', 'paid', 'o2');

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Title`, `Category`, `Price`, `Rating`, `Stock`, `Description`, `Sales`, `DiscountedPrice`, `ProductImage`) VALUES
('P0', 'Cartoon Astronout T-Shirt', 'Shirt', 69, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from ', 0, 69, '/Frontend/img/products/f2.jpg'),
('P1', 'Fancy T-Shirt', 'Pants', 64, 5, 11, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 69, '/Frontend/img/products/f1.jpg'),
('P10', 'Formal Shirt Dark Blue', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n2.jpg'),
('P11', 'Formal Shirt White', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n3.jpg'),
('P12', 'Fancy Shirt White', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n4.jpg'),
('P13', 'Fancy Shirt Blue', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n5.jpg'),
('P14', 'Fancy Shorts', 'Pants', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n6.jpg'),
('P15', 'Fancy Browin Shirt', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n7.jpg'),
('P16', 'Fancy Dark Shirt', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n8.jpg'),
('P2', 'Bueatiful T-Shirt', 'Shirt', 35, 5, 31, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 64, '/Frontend/img/products/f3.jpg'),
('P3', 'Cartoon Astronout T-Shirt', 'Shirt', 69, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 69, '/Frontend/img/products/f2.jpg'),
('P4', 'Flower Pattern Shirt', 'Shirt', 35, 5, 31, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/f4.jpg'),
('P5', 'Blue Flower Pattern Shirt', 'Shirt', 36, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/f5.jpg'),
('P6', 'Blue and Orange Shirt', 'Shirt', 85, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/f6.jpg'),
('P7', 'Casual Pants', 'Pants', 55, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/f7.jpg'),
('P8', 'Casual Blouse', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/f8.jpg'),
('P9', 'Formal Shirt Light Blue', 'Shirt', 75, 5, 21, 'Indulge in effortless style and unparalleled comfort with our signature T-shirt. Crafted from the finest quality cotton, it offers a luxurious feel against the skin while ensuring durability that lasts wash after wash. Designed with meticulous attention t', 0, 85, '/Frontend/img/products/n1.jpg');

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`ProductID`, `CustomerID`, `Rating`, `Message`) VALUES
('p1', 'c2', 6, 'good');

--
-- Dumping data for table `uaqs`
--

INSERT INTO `uaqs` (`UAQID`, `ProductID`, `CustomerID`, `Question`, `Answer`) VALUES
('u1', 'p1', 'c1', 'what is name', 'nothing');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
