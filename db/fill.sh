docker exec -it db psql -U nike -d test -c "
INSERT INTO \"User\"(login, password)
VALUES
('nike', 'NikeByNike'),
('admin', 'admin');
INSERT INTO \"Product\"(name, description, price)
VALUES
('iPhone', 'some phone', 69900),
('iPad', 'some laptop', 49900);
INSERT INTO \"CartPosition\"(\"productId\",\"userId\")
VALUES
(1,1),
(2,1),
(1,2);
"