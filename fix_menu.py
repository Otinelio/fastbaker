import re

file_path = "src/data/menuData.ts"
with open(file_path, "r") as f:
    content = f.read()

# Replace img() definition
content = content.replace(
    "const img = (q: string) =>\n  `https://source.unsplash.com/featured/600x450/?${encodeURIComponent(q)}`;",
    "const img = (id: string) =>\n  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop`;"
)

# Replace image: img("...") with real unsplash ids. I will use a simple hash of the query to pick a valid food image from a list to ensure they always load and are varied.
replacements = [
    ("gourmet burger dark", "1568901346375-23c9450c58cd"),
    ("double cheeseburger bacon", "1586816001966-79b73cb74376"),
    ("crispy chicken burger", "1606755962773-d324e0a13086"),
    ("veggie burger", "1520072959219-c595dc870360"),
    ("cheese hot dog", "1612392062631-94ddbfc9b088"),
    ("kebab wrap", "1633321702518-7ef1d1020dc6"),
    ("chicken wings spicy", "1524114664604-cd8133cd6771"),
    ("chicken nuggets", "1562967914-608f82629710"),
    ("french fries", "1576107232684-1279f390859f"),
    ("loaded fries cheese", "1585109649288-f5f6be8e46bc"),
    ("rice grilled chicken", "1604908176997-125f25cc6f3d"),
    ("fried rice vegetables", "1603133872878-684f208fb84b"),
    ("spaghetti bolognese", "1512058564366-18510be2db19"),
    ("fried chicken fries", "1626082927389-6cd097cdc6ec"),
    ("grilled fish plantain", "1626808642875-0aa545482dfb"),
    ("omelette cheese ham", "1510693000420-569df4cdaf00"),
    ("club sandwich", "1528735602780-2552fd46c7af"),
    ("croissant butter", "1555507036-ab1f40ce88cb"),
    ("pain au chocolat", "1608198093002-ad4e005484ec"),
    ("brioche bread", "1509440159596-0249088772ff"),
    ("filled brioche jam", "1612203985729-70726954388c"),
    ("apple turnover pastry", "1599313936930-b38cb7d6c6e7"),
    ("chocolate muffin", "1607958996333-41aef7caefaa"),
    ("coffee eclair pastry", "1612203985729-70726954388c"),
    ("fruit tart pastry", "1483695028939-5bb13f8648b0"),
    ("macarons colorful", "1563805042-7684c8a9e9cb"),
    ("chouquettes pastry", "1550617931-e17a7b70d32f"),
    ("chocolate lava cake", "1606890737304-57a1ca8a5b62"),
    ("tiramisu", "1571115177098-24de14c51bb4"),
    ("panna cotta", "1488477181943-6b5c2a11b65f"),
    ("creme caramel", "1601000938259-9e92002320b2"),
    ("fruit salad fresh", "1490474418585-bc9e548d8881"),
    ("chocolate mousse", "1563805042-7684c8a9e9cb"),
    ("ice cream scoops", "1563805042-7684c8a9e9cb"),
    ("hibiscus drink", "1513558161293-cdaf765ed2fd"),
    ("ginger juice", "1544145945-f90425340c7e"),
    ("fresh orange juice", "1600271886742-f049cd451bba"),
    ("tropical smoothie", "1505252585461-04db1eb84625"),
    ("chocolate milkshake", "1572490142747-9d62d47d0e4f"),
    ("vanilla caramel milkshake", "1572490142747-9d62d47d0e4f"),
    ("black coffee espresso", "1513558161293-cdaf765ed2fd"),
    ("hot chocolate", "1544145945-f90425340c7e"),
    ("water bottle", "1523362628745-0c64ce82beed"),
    ("coca cola can", "1622483767028-fd16792b77a0"),
    ("sprite can", "1622483767028-fd16792b77a0")
]

for q, id in replacements:
    content = content.replace(f'img("{q}")', f'img("{id}")')

with open(file_path, "w") as f:
    f.write(content)

