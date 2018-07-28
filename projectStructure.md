# Ascendit Platform Structure
Architecture Design of the Ascendit Platform

## Overview
From the UI, users will be able to create a "strategy" (name to change) which is a composition of modules. 

## Modules
There are 6 types of modules.
1. Data Stream
2. Signal Generation
3. Notification
4. Portfolio Manager
5. Execution
6. Accounting

### Data Streams
Input: Data File (primarily for backtesting) or Source of Data (API Connection for live data).
Output: Emits newData signal, payload contains the relevant data.

### Signal Generation
Input: newData signal, primarily from a Data Stream.
Output: Emits newSignal, payload contains side and price.

### Notification
Input: newSignal, primarily from Signal Generation.
Output: Email, text, UI update, etc.

### Portfolio Manager
Input: newSignal, primarily from Signal Generation.
Output: Emits newOrder signal, payload contains quantity as well as side and price.

### Execution
Input: newOrder, primarily from Portfolio Manager, possibly from manual-assisted trades.
Output: Order creation at API, newExecutedOrder, payload contains order ID.

### Accounting
Input: newExecutedOrder, primarily from Execution, possibly from manual-assisted trades.
Output: DB Updates when orders are completed.
