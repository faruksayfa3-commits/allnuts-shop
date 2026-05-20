-- ============================================================
-- ALLNUTS SHOP — Date reale de pe allnuts.ro
-- ============================================================

-- Categorii reale AllNuts
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Semințe', 'seminte', 'Semințe premium, naturale și gustoase', 1),
  ('Arahide', 'arahide', 'Arahide coapte și sărate, pentru orice ocazie', 2),
  ('Nuci & Mix', 'nuci-mix', 'Mixuri premium de nuci și semințe', 3)
ON CONFLICT (slug) DO NOTHING;

-- Produse reale de pe allnuts.ro
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, images, category_id, stock, weight_grams, units_per_box, tags, is_featured) VALUES

-- Semințe floarea soarelui — pungă mov (extrasarate)
(
  'Semințe Floarea Soarelui Extrasărate',
  'seminte-floarea-soarelui-extrasarate',
  'Semințe pestrite, sărate la perfecție. Produs natural, fără conservanți, ideal pentru gustări sănătoase. Semințele noastre sunt atent selecționate pentru a asigura cea mai bună calitate și gust.',
  'Seminte pestrite, sarate la perfectie',
  5.99,
  7.99,
  ARRAY['https://allnuts.ro/images/mov130g.png'],
  (SELECT id FROM categories WHERE slug = 'seminte'),
  200, 130, 15,
  ARRAY['extrasarat', 'bestseller', 'natural'],
  TRUE
),

-- Semințe floarea soarelui — pungă roșie (ușor sărate)
(
  'Semințe Floarea Soarelui Ușor Sărate',
  'seminte-floarea-soarelui-usor-sarate',
  'Semințe pestrite, coapte la perfecție. Cu un gust delicat și ușor sărat, perfecte pentru cei care preferă o variantă mai blândă. 100% naturale, fără aditivi.',
  'Seminte pestrite, coapte la perfectie',
  5.99,
  NULL,
  ARRAY['https://allnuts.ro/images/rosu130g.png'],
  (SELECT id FROM categories WHERE slug = 'seminte'),
  200, 130, 15,
  ARRAY['usor-sarat', 'natural', 'popular'],
  TRUE
),

-- Arahide roșii coapte și sărate
(
  'Arahide Roșii Coapte și Sărate',
  'arahide-rosii-coapte-sarate',
  'Sănătos și gustos, special pentru orice ocazie. Arahidele noastre roșii sunt coapte la perfecție, cu o textură crocantă și un gust irezistibil. Bogate în proteine și grăsimi sănătoase.',
  'Sanatos si gustos, special pentru orice ocazie',
  8.99,
  10.99,
  ARRAY['https://allnuts.ro/images/arahiderosii.png'],
  (SELECT id FROM categories WHERE slug = 'arahide'),
  150, 250, 12,
  ARRAY['coapte', 'sarat', 'proteic', 'popular'],
  TRUE
),

-- Produse suplimentare (box / cutie)
(
  'Cutie Semințe Extrasărate 15 buc',
  'cutie-seminte-extrasarate-15buc',
  'Cutie completă cu 15 pungi de 130g semințe extrasărate. Perfectă pentru evenimentele de familie, petreceri sau distribuție. Produs BRC & IFS certificat.',
  'Cutie 15 pungi x 130g — livrare rapidă',
  79.99,
  89.99,
  ARRAY['https://allnuts.ro/images/mov130g.png'],
  (SELECT id FROM categories WHERE slug = 'seminte'),
  50, 1950, 1,
  ARRAY['cutie', 'bulk', 'events', 'bestseller'],
  FALSE
),

(
  'Cutie Arahide Roșii 12 buc',
  'cutie-arahide-rosii-12buc',
  'Cutie completă cu 12 pungi de 250g arahide roșii coapte și sărate. Ideal pentru distribuție en-gros sau cadouri corporate. Certificat BRC & IFS.',
  'Cutie 12 pungi x 250g — ideal en-gros',
  89.99,
  NULL,
  ARRAY['https://allnuts.ro/images/arahiderosii.png'],
  (SELECT id FROM categories WHERE slug = 'arahide'),
  50, 3000, 1,
  ARRAY['cutie', 'bulk', 'corporate'],
  FALSE
)

ON CONFLICT (slug) DO UPDATE SET
  price = EXCLUDED.price,
  stock = EXCLUDED.stock,
  is_featured = EXCLUDED.is_featured;
