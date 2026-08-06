# Imágenes

## Carta sorpresa (ya cargadas)

La carta sorpresa elige una foto al azar entre estas 4 cada vez que se abre:

- `ascensor.jpeg`
- `carlos-keen.jpeg`
- `comida-noche.jpeg`
- `pastafrola.jpeg`

La lista está en `src/components/CartaSorpresa.tsx` (`fotosSorpresa`). Para agregar o sacar fotos de esa rotación, editá ese array.

## Fotos de los planes (opcional)

Si querés poner una foto específica para cada plan (en vez del fallback con gradiente + emoji), agregá estos archivos y asegurate que el nombre coincida con el campo `foto` de `src/data/planes.ts`:

- `tigre.jpg`
- `carlos-keen.jpg` (distinto del `carlos-keen.jpeg` de la carta sorpresa)
- `cine.jpg`
- `parque-de-la-costa.jpg`
- `cafeteria.jpg`
- `pelicula-en-casa.jpg`
- `curry-garbanzos.jpg`
- `floreria-atlantico.jpg`
- `artemisia.jpg`
- `jazz.jpg`
- `feria-san-telmo.jpg`
- `lagos-palermo.jpg`
- `laguna-lobos.jpg`
- `tigre-lancha.jpg`
- `isla-tigre.jpg`
- `areco.jpg`
- `la-plata.jpg`
- `lujan.jpg`
- `laguna-pilar.jpg`
- `domo.jpg`
- `entre-rios.jpg`
- `bici-palermo.jpg`
- `rompecabezas.jpg`
- `parque-aereo.jpg`
- `escalada.jpg`
- `museo.jpg`
- `planetario.jpg`
- `bar-vinos.jpg`
- `sala-escape.jpg`

Si no están, la app funciona igual con el fallback (gradiente + emoji).
