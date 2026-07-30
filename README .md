# Superstore Sales Dashboard (Power BI)

A fictional retail sales dataset (5,000 rows) with a Power BI–style dashboard built on top of it.

## Files in this delivery

| File | What it is |
|---|---|
| `superstore_sales.csv` | The dataset — import this into Power BI as your data source. |
| `dashboard.png` | A preview image of the finished dashboard, so you know what you're building toward. |
| `README.md` | This file — setup + rebuild guide. |

> **Note on the `.pbix` file:** I can't generate a real `Superstore_Sales_Dashboard.pbix`. That's Power BI Desktop's own binary project format, and it can only be created by the actual Power BI Desktop application — there's no way to hand-author a valid one outside it. Anything claiming to be a `.pbix` without coming from Power BI itself would just fail to open. Instead, follow the steps below to rebuild the exact same dashboard in Power BI Desktop in about 10–15 minutes — then **save that as your `.pbix`.**

## Step 1 — Import the data

1. Open Power BI Desktop → **Get Data → Text/CSV** → select `superstore_sales.csv`.
2. Click **Transform Data** and set column types:
   - `Order Date` → Date
   - `Sales`, `Profit`, `Discount` → Decimal Number
   - `Quantity` → Whole Number
   - Everything else → Text
3. Click **Close & Apply**.

## Step 2 — Build the visuals

Add a blank canvas, dark teal background (`#0E2429`), and place these visuals:

| Visual | Type | Fields |
|---|---|---|
| Sales by Ship Mode | Donut chart | Legend: `Ship Mode`, Values: `Sales` |
| Sales by Region | Donut chart | Legend: `Region`, Values: `Sales` |
| Sales by Segment | Donut chart | Legend: `Customer Segment`, Values: `Sales` |
| Orders | Card | Count of rows |
| Sales | Card | Sum of `Sales` |
| Profit | Card | Sum of `Profit` |
| Avg Discount | Card | Average of `Discount` |
| Sales by Month | Area chart | Axis: `Order Date` (month), Values: `Sales` |
| Profit by Month | Area chart | Axis: `Order Date` (month), Values: `Profit` |
| Profit and Sales by State | Filled map or Bar chart | Location: `State`, Values: `Sales`, `Profit` |
| Sales by Category | Bar chart | Axis: `Category`, Values: `Sales` |
| Sales by Sub-Category | Bar chart | Axis: `Sub-Category`, Values: `Sales` |
| Region filter | Slicer (button style) | Field: `Region` |

## Suggested color palette

- Background: `#0E2429`
- Panel/card background: `#153238`
- Panel border: `#1F4048`
- Text: `#EAF4F4` (headings), `#8FA8AC` (muted labels)
- Chart accents: Coral `#E8734A` · Blue `#4FA8D8` · Mint `#3FBF8F` · Gold `#E8C34F`

## Step 3 — Save

**File → Save As → Superstore_Sales_Dashboard.pbix**

## Dataset schema

`superstore_sales.csv` columns:

- **Order Date** — MM/DD/YYYY, Jan 2021 – Dec 2024
- **Region** — East, West, Central, South
- **State** — U.S. state, mapped to its region
- **Category** — Furniture, Office Supplies, Technology
- **Sub-Category** — e.g. Chairs, Binders, Phones, Copiers
- **Product Name** — fictional product/brand name
- **Sales** — order revenue ($)
- **Profit** — order profit ($, can be negative on heavily discounted items)
- **Quantity** — units ordered (1–14)
- **Discount** — discount rate applied (0–0.8)
- **Customer Segment** — Consumer, Corporate, Home Office
- **Ship Mode** — Standard Class, Second Class, First Class, Same Day

## Notes

- All data is **synthetic**, generated for demo/portfolio purposes — not real sales.
- Random seed is fixed, so regenerating the source script reproduces the same dataset.
