import React, { useState, useEffect } from 'react';
import { IGuideProfileDataProps } from '../../containers/GuideProfile/types';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import poland from '../../assets/icons/poland.png';
import unitedKingdom from '../../assets/icons/unitedKingdom.png';
import germany from '../../assets/icons/germany.png';
import Rating from '@material-ui/lab/Rating';
import i18n from '../../locales/i18n';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    padding: '1rem 2rem',
  },
  row: {
    marginTop: '1rem',
  },
  avatar: {
    boxShadow: '0px -1px 20px 2px rgba(0, 0, 0, 0.13)',
    width: '140px',
    height: '140px',
  },
  flag: {
    height: '75%',
    padding: '0 0.2rem',
  },

  text: {
    color: theme.palette.text.primary,
  },
  textCenter: {
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const getLanguage = (code: string) => {
  switch (code) {
    case 'PL':
      return i18n.t('Polish');
    case 'EN':
      return i18n.t('English');
    case 'DE':
      return i18n.t('German');
  }
};

const getCountry = (code: string) => {
  switch (code) {
    case 'PL':
      return i18n.t('Poland');
    case 'EN':
      return i18n.t('England');
    case 'DE':
      return i18n.t('Germany');
  }
};

const getFlag = (code: string) => {
  switch (code) {
    case 'PL':
      return poland;
    case 'EN':
      return unitedKingdom;
    case 'DE':
      return germany;
  }
};

const GuideProfileData = (props: IGuideProfileDataProps) => {
  const { profileData, profile } = props;

  const classes = useStyles();

  const { t } = useTranslation();

  const [experience, setExperience] = useState<string>('');
  // eslint-disable-next-line
  const [telephone, setTelephone] = useState<string>('');

  useEffect(() => {
    let tmp = '';
    for (let i = 0; i < profile.experience; i++) {
      tmp += '★';
    }
    for (let i = profile.experience; i < 5; i++) {
      tmp += '☆';
    }
    setExperience(tmp);
  }, [profileData, profile.experience]);

  useEffect(() => {
    let result = '';
    const tmp = profileData.telephone.split('');

    result = '+' + tmp[0] + tmp[1] + ' ' + tmp[2] + tmp[3] + tmp[4] + ' ' + tmp[5] + tmp[6] + tmp[7] + ' ' + tmp[8] + tmp[9] + tmp[10];
    setTelephone(result);
  }, [profileData.telephone]);

  return (
    <Grid container className={classes.root}>
      <Grid container justify='center' alignItems='center'>
        <Avatar className={classes.avatar} src={profile.avatar} alt='' />
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={12} sm={12}>
          <Typography variant='body1' className={classes.textCenter}>
            {profile.firstName} {profile.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant='body2' className={classes.textCenter}>
            ({profileData.age}, {t(profileData.gender)})
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid container item justify='flex-end' xs={6} sm={6}>
          {getCountry(profileData.country)}
        </Grid>
        <Grid container item justify='flex-start' xs={6} sm={6}>
          <img src={profileData.country === 'PL' ? poland : ''} alt='' className={classes.flag} />
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item className={classes.text} xs={6} sm={6}>
          <Typography variant='body1'>{t('Average mark')}:</Typography>
        </Grid>
        <Grid container item justify='flex-end' xs={6} sm={6}>
          {profile.averageMark > 0 ? (
            <>
              <Rating precision={0.5} name='read-only' value={Math.round(profile.averageMark * 10) / 10} readOnly />
              <Typography style={{ marginTop: 'auto' }} variant='body1'>
                {Math.round(profile.averageMark * 10) / 10}/5
              </Typography>
            </>
          ) : (
            <Typography color='error' variant='body1'>
              B. D.
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container className={classes.row}>
        <Grid item className={classes.text} xs={6} sm={6}>
          <Typography variant='body1'>{t('Languages')}:</Typography>
        </Grid>
        <Grid container item justify='flex-end' xs={6} sm={6}>
          {profile.languages.map((lng: string) => (
            <img className={classes.flag} src={getFlag(lng)} alt={lng} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GuideProfileData;
