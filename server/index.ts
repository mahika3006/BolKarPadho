import app from './app';

const PORT = process.env.PORT || 3001;
const GNANI_API_KEY = process.env.GNANI_API_KEY || '';

app.listen(PORT, () => {
  console.log(`BolkarPadho backend server running on http://localhost:${PORT}`);
  console.log(`Gnani Key Status: ${GNANI_API_KEY ? 'Configured (' + GNANI_API_KEY.slice(0, 10) + '...)' : 'Not set (Browser API fallback enabled)'}`);
});
