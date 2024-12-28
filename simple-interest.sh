#!/bin/bash

# Simple Interest Calculation

# Prompt user for inputs
echo "Enter the principal amount (P): "
read principal
echo "Enter the rate of interest (R) in percentage: "
read rate
echo "Enter the time (T) in years: "
read time

# Calculate Simple Interest
simple_interest=$(echo "$principal * $rate * $time / 100" | bc)

# Output the result
echo "The simple interest is: $simple_interest"
