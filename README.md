knockout-grids
==============

Investigation of virtualised scrolling grids from scratch in knockout

If you look back through the history you'll see me trying various ways to implement virtual scrolling, 
allowing efficient display of very large numbers of grid rows.

In the most extreme case, where I separate the scrollbars out entirely, I show a billion rows!

There's a less extreme compromise where it can handle around 10 million.

I hope to keep developing this into a knockout grid toolkit, with the emphasis on flexibility/minimalism,
as most grids seem to be monolithic masses of code and hard to extend or modify.
