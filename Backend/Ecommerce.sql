-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2024 at 09:04 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `Category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`Category`) VALUES
('1'),
('Clothing'),
('Electronics'),
('Home & Kitchen');

-- --------------------------------------------------------

--
-- Table structure for table `customercart`
--

CREATE TABLE `customercart` (
  `CustomerID` varchar(255) NOT NULL,
  `ProductID` varchar(255) NOT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customercart`
--

INSERT INTO `customercart` (`CustomerID`, `ProductID`, `Quantity`) VALUES
('c2', 'p3', 5);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `CustomerID` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `DateRegistered` date DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerID`, `Email`, `Username`, `Password`, `Address`, `DateRegistered`, `Status`, `Type`) VALUES
('C1', 'customer1@example.com', 'customer1', 'password1', '123 Street, City', '2024-04-27', 'Active', 'Regular'),
('C2', 'customer2@example.com', 'customer2', 'password2', '456 Avenue, Town', '2024-04-27', 'Active', 'Regular');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `FAQID` varchar(255) NOT NULL,
  `ProductID` varchar(255) DEFAULT NULL,
  `Question` varchar(255) DEFAULT NULL,
  `Answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`FAQID`, `ProductID`, `Question`, `Answer`) VALUES
('f2', 'p3', 'What is color', 'Black');

-- --------------------------------------------------------

--
-- Table structure for table `orderedproducts`
--

CREATE TABLE `orderedproducts` (
  `OrderID` varchar(255) NOT NULL,
  `ProductID` varchar(255) NOT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderedproducts`
--

INSERT INTO `orderedproducts` (`OrderID`, `ProductID`, `Quantity`) VALUES
('O2', 'p1', 9),
('O2', 'p2', 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `CustomerID` varchar(255) DEFAULT NULL,
  `OrderID` varchar(255) NOT NULL,
  `Date` date DEFAULT NULL,
  `TotalCost` float DEFAULT NULL,
  `OrderStatus` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`CustomerID`, `OrderID`, `Date`, `TotalCost`, `OrderStatus`, `Address`) VALUES
('C2', '10', '2024-04-26', 100, 'Cancelled', '123 Street, City'),
('C2', 'O2', '2024-04-27', 150, 'Processing', '456 Avenue, Town');

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethods`
--

CREATE TABLE `paymentmethods` (
  `MethodID` varchar(255) NOT NULL,
  `PaymentMethodName` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paymentmethods`
--

INSERT INTO `paymentmethods` (`MethodID`, `PaymentMethodName`, `Type`) VALUES
('m2', 'JazzCah', 'Online');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `PaymentMethod` varchar(255) DEFAULT NULL,
  `PaymentStatus` varchar(255) DEFAULT NULL,
  `OrderID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`PaymentMethod`, `PaymentStatus`, `OrderID`) VALUES
('m2', 'pending', '10'),
('m2', 'paid', 'o2');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` varchar(255) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Rating` float DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Sales` int(11) DEFAULT NULL,
  `DiscountedPrice` float DEFAULT NULL,
  `ProductImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Title`, `Category`, `Price`, `Rating`, `Stock`, `Description`, `Sales`, `DiscountedPrice`, `ProductImage`) VALUES
('12', '12', '1', 12, 12, 21, 'no', 12, 1, 'q2oiejiqo'),
('1212', 'sd', '1', 123, NULL, 1324, 'few', NULL, 321, 'da'),
('P1', 'Product 22222', 'Clothing', 10, 4, 200, 'Sed ut updated unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', 100, 29.99, 'product2.jpg'),
('P2', 'Product 2', 'Clothing', 0, 4, 200, 'Sed ut updated unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', 100, 29.99, 'product2.jpg'),
('P3', 'Product 3', 'Clothing', 0, 3, 199, 'Sed ut updated unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', 100, 29.99, 'product2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `ProductID` varchar(255) NOT NULL,
  `CustomerID` varchar(255) NOT NULL,
  `Rating` float DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`ProductID`, `CustomerID`, `Rating`, `Message`) VALUES
('p1', 'c2', 6, 'good');

-- --------------------------------------------------------

--
-- Table structure for table `uaqs`
--

CREATE TABLE `uaqs` (
  `UAQID` varchar(255) NOT NULL,
  `ProductID` varchar(255) DEFAULT NULL,
  `CustomerID` varchar(255) DEFAULT NULL,
  `Question` varchar(255) DEFAULT NULL,
  `Answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uaqs`
--

INSERT INTO `uaqs` (`UAQID`, `ProductID`, `CustomerID`, `Question`, `Answer`) VALUES
('u1', 'p1', 'c1', 'what is name', 'nothing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category`);

--
-- Indexes for table `customercart`
--
ALTER TABLE `customercart`
  ADD PRIMARY KEY (`CustomerID`,`ProductID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`FAQID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orderedproducts`
--
ALTER TABLE `orderedproducts`
  ADD PRIMARY KEY (`OrderID`,`ProductID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`MethodID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`OrderID`) USING BTREE,
  ADD KEY `fk_payments_payment_method` (`PaymentMethod`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `Category` (`Category`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ProductID`,`CustomerID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `CustomerID` (`CustomerID`) USING BTREE,
  ADD KEY `CustomerID_2` (`CustomerID`) USING BTREE;

--
-- Indexes for table `uaqs`
--
ALTER TABLE `uaqs`
  ADD PRIMARY KEY (`UAQID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customercart`
--
ALTER TABLE `customercart`
  ADD CONSTRAINT `customercart_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `customercart_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `faqs`
--
ALTER TABLE `faqs`
  ADD CONSTRAINT `faqs_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orderedproducts`
--
ALTER TABLE `orderedproducts`
  ADD CONSTRAINT `orderedproducts_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderedproducts_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_orders` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `fk_payments_payment_method` FOREIGN KEY (`PaymentMethod`) REFERENCES `paymentmethods` (`MethodID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Category`) REFERENCES `categories` (`Category`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);

--
-- Constraints for table `uaqs`
--
ALTER TABLE `uaqs`
  ADD CONSTRAINT `uaqs_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`),
  ADD CONSTRAINT `uaqs_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
