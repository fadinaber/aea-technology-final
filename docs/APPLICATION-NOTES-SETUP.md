# Application Notes Setup Guide

## Where to Put Application Notes PDFs

**Location**: `public/documents/application-notes/`

## File Naming Convention

Rename your application note PDFs to match their ID in **lowercase** format:

### Examples:

| Original Filename | Rename To | Application Note |
|------------------|-----------|-----------------|
| `63dc295f5032918ac9873629_AN258 USB-to-Serial Communications.pdf` | `an258.pdf` | AN258 - USB-to-Serial Communications |
| `AN150 Using Batteries.pdf` | `an150.pdf` | AN150 - Using Batteries |
| `AN223 Wet Twisted Pair Cable.pdf` | `an223.pdf` | AN223 - Wet Twisted Pair Cable |
| `White Paper VIA Analyzer vs VIA Bravo.pdf` | `white-paper-via.pdf` | White Paper - VIA Analyzer vs VIA Bravo |

## Step-by-Step Instructions

1. **Navigate to the folder**:
   ```
   public/documents/application-notes/
   ```

2. **Rename your PDF files**:
   - Extract the application note ID from the filename (e.g., "AN258" from your example)
   - Convert to lowercase (e.g., "an258")
   - Add `.pdf` extension
   - Final name: `an258.pdf`

3. **Copy the renamed files** into `public/documents/application-notes/`

## Complete List of Application Notes

The system expects these files (all in lowercase):

### General Application Notes
- `an150.pdf` - Using Batteries in AEA Technology Instruments
- `an152.pdf` - Troubleshooting Serial Port Operations
- `an153.pdf` - Cold Weather Operations for AEA Technology Instruments

### VNA Application Notes
- `an100.pdf` - What SWR Does Not Show
- `an101.pdf` - When to Use Cable Null
- `an102.pdf` - Understanding Vector Network Analysis
- `an103.pdf` - Understanding Relationships of Impedance
- `an104.pdf` - Smith Chart 101
- `an110.pdf` - Coaxial Stub Tuning
- `an111.pdf` - Find Characteristics of an Unknown Cable
- `an112.pdf` - Tuning an Antenna
- `an113.pdf` - Measuring Discrete Components
- `an114.pdf` - Tower Site Tips
- `an120.pdf` - Measuring Amplifier Gain
- `an121.pdf` - Measuring Group Delay
- `an122.pdf` - Measuring Gain Compression
- `an124.pdf` - Measuring Differential Amplifiers
- `an125.pdf` - Measuring AM to PM Distortion
- `an131.pdf` - Using the Network Analyzer as a Signal Source
- `an132.pdf` - Using the Network Analyzer as a Grid Dip Oscillator
- `white-paper-via.pdf` - White Paper - VIA Analyzer vs VIA Bravo

### TDR Application Notes
- `an200.pdf` - Basic Theory of TDR Operation
- `an201.pdf` - Step vs Pulse TDR Technology
- `an203.pdf` - Getting the Most From Your TDR
- `an204.pdf` - Impedance Shifts
- `an205.pdf` - Comparison of TDR vs FDR
- `an210.pdf` - Coax Cable Resistance
- `an211.pdf` - Poor Coax Splice
- `an212.pdf` - Crushed or Pinched Coax
- `an213.pdf` - Wet Coax Cable
- `an214.pdf` - Coax Cable Terminations
- `an215.pdf` - Mixed Cable Types
- `an216.pdf` - Coax Cable Tee
- `an217.pdf` - Measuring Feedline on a Tower
- `an220.pdf` - Twisted Pair Cable Resistance
- `an221.pdf` - Poor Splice in a Twisted Pair Cable
- `an222.pdf` - Telco Style Alligator Clips
- `an223.pdf` - Wet Twisted Pair Cable
- `an224.pdf` - Twisted Pair Cable Terminations
- `an225.pdf` - Split Pairs and Re-split Pairs
- `an226.pdf` - Bridged Taps
- `an227.pdf` - Testing Premise Telco Pairs
- `an228.pdf` - Testing Network Cable Shields
- `an250.pdf` - Measuring a Cable from Both Ends
- `an254.pdf` - Intermittent Cable Operations
- `an255.pdf` - Removing Test Lead Lengths
- `an256.pdf` - Sampling a Cable's Velocity
- `an257.pdf` - TDR's Soft Reset and Battery Charging
- `an258.pdf` - USB-to-Serial Communications
- `an259.pdf` - Testing Single Wires In A Harness

## How It Works

Once you place the files in the correct location with the correct names:

1. The website will automatically link to them
2. Users can download them from the Resources page
3. Links are generated automatically based on the application note ID
4. Files are served from your domain (better SEO)

## Quick Reference

**Folder Path**: `public/documents/application-notes/`

**Naming Pattern**: `{id}.pdf` (lowercase, e.g., `an258.pdf`)

**Example**: For "AN258 USB-to-Serial Communications", the file should be named `an258.pdf` and placed in `public/documents/application-notes/an258.pdf`

