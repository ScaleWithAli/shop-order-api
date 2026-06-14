from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.auth import get_current_user, get_admin_user
from typing import Optional

router = APIRouter(prefix="/products", tags=["products"])

SEED_PRODUCTS = [
    {
        "name": "Premium Cotton T-Shirt",
        "description": "Limited edition luxury cotton tee — only 5 left! 🔥",
        "price": 29.99,
        "stock": 5,
        "category": "clothing",
    },
    {
        "name": "Cartoon Oversized Hoodie",
        "description": "Trending fast! 23 people viewing this right now 👀",
        "price": 59.99,
        "stock": 3,
        "category": "clothing",
    },
    {
        "name": "Noir Parfum 100ml",
        "description": "Best seller! ⚡ 40% off today only — ends midnight",
        "price": 49.99,
        "stock": 10,
        "category": "fragrance",
    },
    {
        "name": "Graphic Cartoon Tee",
        "description": "Flash sale 🚨 Was $45 — grab it before it's gone!",
        "price": 19.99,
        "stock": 8,
        "category": "clothing",
    },
    {
        "name": "Oud Royale Perfume",
        "description": "Exclusive drop 👑 Only 2 bottles remaining worldwide",
        "price": 89.99,
        "stock": 2,
        "category": "fragrance",
    },
]


def seed_products(db: Session):
    if db.query(models.Product).count() == 0:
        for p in SEED_PRODUCTS:
            db.add(models.Product(**p))
        db.commit()


@router.get("", response_model=schemas.ProductListResponse)
def get_products(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    seed_products(db)
    query = db.query(models.Product).filter(models.Product.is_active == True)
    if category:
        query = query.filter(models.Product.category == category)
    products = query.all()
    return {"total": len(products), "products": products}


@router.get("/{product_id}", response_model=schemas.ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.is_active == True
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=schemas.ProductResponse, status_code=201)
def create_product(
    payload: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_admin_user)
):
    product = models.Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.patch("/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: int,
    payload: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_admin_user)
):
    product = db.query(models.Product).filter(
        models.Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}", status_code=204)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_admin_user)
):
    product = db.query(models.Product).filter(
        models.Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.is_active = False
    db.commit()
